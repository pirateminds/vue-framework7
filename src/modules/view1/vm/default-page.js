export const DefaultPage = {
  data() {
    return {
        sorting: true,
        data: [1, 2, 3]
    }
  },
  render(h) {
    return (<f7-page>
        <f7-navbar>
          <f7-nav-left>
            Default Page
          </f7-nav-left>
          <f7-nav-right>
            <f7-link icon-material="add" href="/other-page" title="Add Pairs" view="#view1"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-list media-list id="sortable" sortable>
           {this.data.map((r, index) => (
             <f7-list-item
                  badge-color="blue"
                  >{index}
             </f7-list-item>
           ))}
        </f7-list>
      </f7-page>
    )
  }
}
