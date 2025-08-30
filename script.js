function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const page = document.getElementById("pageContainer");

  sidebar.classList.toggle("open");
  page.classList.toggle("shifted");

}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const userData = {
      idToken: googleUser.getAuthResponse().id_token,
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl()
    };

    // Save user info to localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Optionally, send to your backend for registration
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(response => {
      // Redirect based on user type (student/tutor)
      // Example: check if on student or tutor sign-in page
      if (window.location.pathname.includes('student-sign-in')) {
        window.location.href = 'student-home.html';
      } else if (window.location.pathname.includes('tutor-sign-in')) {
        window.location.href = 'tutor-home.html';
      }
    });
  }

// Add this to script.js and include it on every page you want protected
/*
function requireLogin(userType) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    // Not logged in, redirect to sign-in
    window.location.href = userType === 'student' ? 'student-sign-in.html' : 'tutor-sign-in.html';
  } else {
    document.getElementById('welcome').textContent = `Welcome, ${user.firstName}!`;
  }
}
  */

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}