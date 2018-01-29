const clickHandler = (context)=> (obj)=> {
  Object.keys(context.isActive).forEach(e=> {
    context.isActive[e] = false;
  });
}

export const CtTabbar = {
  data() {
    return {
      isActive: {
        view1: true,
        view2: false,
        view3: false,
      }
    }
  },
  render(h) {
    return (
        <f7-toolbar tabbar bottom class="main-toolbar" hide-tabbar-on-scroll ref="toolbar">
            <f7-link
              text={'view1'}
              active={this.isActive.view1}
              on-click={clickHandler(this)}
              material="card_giftcard"
              tab-link="#view1">
              </f7-link>
            {this.$perms.hasPermissions('DEV') && <f7-link
              text={'view2'}
              material="card_giftcard"
              active={this.isActive.view2}
              on-click={clickHandler(this)}
              tab-link="#view2">
              </f7-link>}
            {this.$perms.hasPermissions('DEV') && <f7-link
              text={'view3'}
              on-click={clickHandler(this)}
              material="card_giftcard"
              active={this.isActive.view3}
              tab-link="#view3">
              </f7-link>}
          </f7-toolbar>
    )
  }
}
