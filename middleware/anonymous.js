/**
 * Created by jason on 2017/2/27.
 */
export default function ({store, redirect}) {
  if (store.getters.isAuthenticated) {
    return redirect('/manufacture-manage')
  }
}
