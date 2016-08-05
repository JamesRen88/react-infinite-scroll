/**
 * Created by Soup Tang on 2016/8/2.
 */
import React from 'react';
import ReactDom from 'react-dom';
import InfiniteScroll from '../dist/InfiniteScroll';

class Item extends React.Component {

    shouldComponentUpdate() {
        console.log('update');
        return false;
    }

    componentDidMount() {
        console.log('did mount');
    }

    componentWillUnmount() {
        console.log('did unmount');
    }

    render() {
        return (
            <p>{this.props.text}</p>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        var num = Math.floor(Math.random() * 100);
        var arr = []
        for (var i = 0; i < num; i++) {
            arr.push(Math.random());
        }
        console.log(num);
        this.state = {
            items: arr
        }
    }

    shouldComponentUpdate() {
        console.log('updateA');
        return true;
    }

    componentDidMount() {
        console.log('did mountA')
    }

    componentWillUnmount() {
        console.log('did unmountA')
    }

    render() {
        return (
            <InfiniteScroll onLoad={this.loadMore.bind(this)} hasMore={true} height="100%">
                {(()=> {
                    return this.state.items.map((item)=> {
                        return <Item text={item}/>
                    })
                })()}
            </InfiniteScroll>
        )
    }

    loadMore() {
        var num = 10;
        var arr = []
        for (var i = 0; i < num; i++) {
            arr.push(Math.random());
        }
        this.setState({
            items: this.state.items.concat(arr)
        });
        //需要返回promise对象
    }

}
ReactDom.render(
    <App/>,
    document.querySelector('#wrapper')
);
