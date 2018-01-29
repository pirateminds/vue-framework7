import { ViewTwoDefaultPage } from './vm/default-page';

export default {
  components: {
    ViewTwoDefaultPage
  },
  render(h) {
    return (<f7-view id="view2" tab>
        <view-two-default-page/>
    </f7-view>);
  }
}
