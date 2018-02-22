/**
 * Created by Administrator on 2018/2/17 0017.
 */
export default {
  updateUserNameInfo: (state, userName) => state.userName = userName,
  updateCartCountInfo: (state, cartCount) => state.cartCount += cartCount,
  initCartCountInfo: state => state.cartCount = 0
}
