import { DefaultPage } from "./vm/default-page"

export default {
    components: {
      DefaultPage
    },
    render(h) {
        return (<f7-view id="view1" tab main url="/" navbar-fixed tab-active>
          <default-page/>
      </f7-view>);
    }
}
