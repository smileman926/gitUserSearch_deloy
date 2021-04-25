import classes from './Layout.module.scss'

const Layout = ({ children }) => {
  return <main className={classes.layout}>{children}</main>
}

export default Layout
