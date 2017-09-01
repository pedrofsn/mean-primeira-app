angular.module('primeiraApp').factory('tabs', [ function() {

   function show(owner, {
      tabList = false,
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false
   }) {
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
      
      if(tabList) selectTab(owner, 'tabList')
      if(tabUpdate) selectTab(owner, 'tabUpdate')
      if(tabDelete) selectTab(owner, 'tabDelete')
   }

   function selectTab(owner, tabName) {
      owner.selectedTab = tabName 
   }

   return { show, selectTab }
}])
