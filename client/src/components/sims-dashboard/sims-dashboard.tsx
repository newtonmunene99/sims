import { Component, h, State } from "@stencil/core";
import RouterTunnel from "../router/Router";

@Component({
  tag: "sims-dashboard",
  styleUrl: "sims-dashboard.scss"
})
export class SimsDashboard {
  @State() user;
  @State() currentIndex: number = 0;
  navLinks = [
    // {
    //   name: "Dashboard",
    //   link: "/dashboard"
    // },

    {
      name: "Shops",
      link: "/dashboard"
    }
  ];
  private navCtrl: HTMLIonRouterElement;

  componentDidLoad() {
    this.user = JSON.parse(localStorage.getItem("sims-user"));
    this.navCtrl = document.querySelector("ion-router");

    this.navCtrl.addEventListener("ionRouteDidChange", (ev: any) => {
      const index = this.navLinks.findIndex(link =>
        link.link.includes(ev.detail.to)
      );
      if (index >= 0) {
        this.currentIndex = index;
      }
    });
  }

  async presentUserPopover(ev) {
    const popover = Object.assign(document.createElement("ion-popover"), {
      component: "user-popover",
      event: ev,
      translucent: true,
      componentProps: { user: this.user }
    });
    document.body.appendChild(popover);

    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data) {
      switch (data) {
        case "change-password":
          this.navCtrl.push("/password/change");
          break;
        case "go-to-admin":
          this.navCtrl.push("/admin");
          break;
        case "go-to-employee":
          this.navCtrl.push("/dashboard");
          break;
        default:
          break;
      }
    }
  }
  render() {
    return (
      <RouterTunnel.Provider
        state={{ router: document.querySelector("ion-router") }}
      >
        <RouterTunnel.Consumer>
          {({ router }: { router: HTMLIonRouterElement }) => [
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-menu-toggle auto-hide="false">
                    <ion-button>
                      <ion-icon slot="icon-only" name="menu"></ion-icon>
                    </ion-button>
                  </ion-menu-toggle>
                </ion-buttons>
                <ion-title>SIMS | Employee</ion-title>
                {this.user ? (
                  <ion-buttons slot="end">
                    <ion-button onClick={ev => this.presentUserPopover(ev)}>
                      {this.user.firstName} {this.user.lastName}
                    </ion-button>
                  </ion-buttons>
                ) : null}
              </ion-toolbar>
            </ion-header>,
            <ion-split-pane content-id="main">
              <ion-menu content-id="main">
                <ion-list lines="none">
                  {this.navLinks.map((link, index) => (
                    <ion-item
                      href={link.link}
                      routerDirection="forward"
                      color={this.currentIndex === index ? "primary" : null}
                      onClick={() => {
                        this.currentIndex = index;
                      }}
                      detail={this.currentIndex === index ? true : false}
                      detailIcon="arrow-forward-outline"
                    >
                      <ion-label>
                        <ion-text
                          color={this.currentIndex === index ? "light" : "dark"}
                        >
                          {link.name}
                        </ion-text>
                      </ion-label>
                    </ion-item>
                  ))}
                  <ion-item
                    class="logout"
                    onClick={() => {
                      localStorage.clear();
                      router.push("/");
                    }}
                  >
                    <ion-label>
                      <ion-text>Logout</ion-text>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-menu>

              <ion-nav id="main" />
            </ion-split-pane>
          ]}
        </RouterTunnel.Consumer>
      </RouterTunnel.Provider>
    );
  }
}
