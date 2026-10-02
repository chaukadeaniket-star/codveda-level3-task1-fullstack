import { UserRound, Package, Heart } from "lucide-react";

function Profile() {
  return (
    <div className="profile-page section">

      <div className="container">

        <div className="page-heading">

          <span className="section-label">
            CHRONOVA / ACCOUNT
          </span>

          <h1>
            Your profile.
          </h1>

        </div>

        <div className="profile-layout">

          <aside className="profile-sidebar">

            <div className="profile-avatar">
              <UserRound size={25} />
            </div>

            <h2>
              Welcome, Collector
            </h2>

            <p>
              collector@chronova.com
            </p>

          </aside>

          <div className="profile-content">

            <div className="profile-stat-grid">

              <div>
                <Package size={20} />
                <strong>04</strong>
                <span>Orders</span>
              </div>

              <div>
                <Heart size={20} />
                <strong>03</strong>
                <span>Wishlist</span>
              </div>

            </div>

            <div className="profile-information">

              <h2>
                Personal Information
              </h2>

              <div className="profile-field">
                <span>Name</span>
                <strong>Collector</strong>
              </div>

              <div className="profile-field">
                <span>Email</span>
                <strong>
                  collector@chronova.com
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;