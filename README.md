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
