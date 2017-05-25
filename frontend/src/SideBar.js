import React from 'react';
import Sidebar from 'react-sidebar';

class App extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      sidebarOpen: true
    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  render(){
    var sidebarContent = <b>Sidebar content</b>;
    console.log('test2');
    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}>
        <b>Main content</b>
      </Sidebar>
    );
  }
};

export default App;
