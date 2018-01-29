import { CtTabbar } from 'components/ct-tabbar';
import ViewOne from './view1/view';
import ViewTwo from './view2/view';
import ViewThree from './view3/view';

export default {
  render(h) {
    return (
      <div id="app">
        <f7-statusbar></f7-statusbar>
        <f7-views tabs>
          <ViewOne/>
          {this.$perms.hasPermissions('DEV') &&  <ViewTwo/>}
          <ViewThree/>

          <CtTabbar/>
        </f7-views>
     </div>
    )
  }
}
