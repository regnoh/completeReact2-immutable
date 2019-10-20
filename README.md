## 转： [immutable.js 以及在 react+redux 项目中的实践](https://juejin.im/post/5948985ea0bb9f006bed7472)

- [redux-immutable](https://github.com/gajus/redux-immutable)
- [Immutable.js](https://immutable-js.github.io/immutable-js/)

redux-immutable is used to create an equivalent function of Redux `combineReducers` that works with `Immutable.js` state.

#### 1. 为什么使用 immutable

1. 原生 js 引用类型为 mutable

   - 优点：频繁的操作数据都是在原对象的基础上修改，不会浪费内存
   - 缺点：不可控，假设一个对象在多处用到，在某一处不小心修改了数据，其他地方很难预见到数据是如何改变的

2. Redux 要求状态是 immutable

   即需要在新对象上做修改。(浅拷贝, 深拷贝)

   reducer：{...state, user: {...payload}}

   缺点：造成更多的性能问题以及内存浪费

#### 2. immutable 对象

1. immutable.js 主要有三大特性：

   1. Persistent data structure （持久化数据结构）
   2. structural sharing （结构共享）
   3. support lazy operation （惰性操作）

#### 3. install

```
tyarn add immutable redux-immutable redux react-redux
```

#### 4. 常用 api 介绍

```js
// rootReducer
import { combineReducers } from "redux-immutable";
// reducer
import { fromJS } from "immutable";
// const initialState = {
//   count: 10
// }
const initialState = fromJS({
  count: 10
});
// return {...state, count: state.count - 1}
return state.updateIn(["count"], v => v - 1);
// app
const mapStateToProps = state => ({
  // count: state.counter.count
  count: state.getIn(["counter", "count"])
});
```

```
fromJS
toJS
update
updateIn
get
getIn
set
setIn
数据类型
Map
List
```

- Should I need to put yarn.lock in .gitignore?

```
You should add yarn.lock to your git, don't ignore it.
See https://yarnpkg.com/en/docs/migrating-from-npm
When you run either yarn or yarn add <package>, Yarn will generate a yarn.lock file within the root directory of your package. You don’t need to read or understand this file - just check it into source control. When other people start using Yarn instead of npm, the yarn.lock file will ensure that they get precisely the same dependencies as you have.
```

### [mobx](https://cn.mobx.js.org/)

```
tyarn add mobx mobx-react
```

### [mobx vs redux](https://www.educba.com/mobx-vs-redux/)

| diff        | mobx  | redux |
| ----------- | ----- | ----- |
| Programmed  | js    | es6   |
| Data store  | > 1   | 1     |
| Application | small | large |
| Scalable    | less  | more  |

1. store/index.js

```js
import { observable, computed, action } from "mobx";

class Counter {
  name = "Counter App";
  @observable count = 100;
  @computed get doubleCount() {
    return this.count * 2;
  }
  @action.bound
  decrease() {
    this.count--;
  }
}
const counterStore = new Counter();
export default counterStore;
```

2. index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import counterStore from "./store";
import App from "./App";

ReactDOM.render(
  <Provider counter={counterStore}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
```

3. App.js

```js
import React, { Component } from "react";
import { CounterButton, CounterDisplay } from "./components";
import { observer, inject } from "mobx-react";
@inject("counter")
class App extends Component {
  render() {
    const { decrease } = this.props.counter;
    return (
      <>
        <CounterButton onClick={decrease}>-</CounterButton>
        <CounterDisplay />
      </>
    );
  }
}
export default App;
```

4. components/CounterDisplay/index.js

```js
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject("counter")
@observer
class CounterDisplay extends Component {
  render() {
    const { doubleCount, count } = this.props.counter;

    return (
      <div>
        <p>原值： {count}</p>
        <p>*2: {doubleCount}</p>
      </div>
    );
  }
}
export default CounterDisplay;
```

4. 不想 inject 整个 counterStore 时， 可如下

```js
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject(store => {
  const { count, doubleCount } = store.counter;
  return {
    count,
    doubleCount
  };
})
@observer
class CounterDisplay extends Component {
  render() {
    const { doubleCount, count } = this.props;

    return (
      <div>
        <p>原值： {count}</p>
        <p>*2: {doubleCount}</p>
      </div>
    );
  }
}
export default CounterDisplay;
```

5. CounterButton

```js
import React, { Component } from "react";

export default class CounterButton extends Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}
```
