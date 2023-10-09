import './index.css'

const Home = ({onLogout}) => (
  <div className="home-container">
    <div className="logo-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
    <h1 className="home-page-heading">Your Flexibility, Our Excellence</h1>
    <img
      src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
      alt="digital card"
      className="digital-card"
    />
  </div>
)

export default Home
