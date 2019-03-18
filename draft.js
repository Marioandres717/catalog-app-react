constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
      handleFbLogin: this.handleFbLogin,
      handleFbLogout: this.handleFbLogout,
      handleDeleteFbPermission: this.handleDeleteFbPermission
    };
  }

  handleFbLogin = async response => {
    try {
      if (response.accessToken) {
        console.log(response);
        const result = await fetch('http://localhost:5000/fbconnect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.accessToken}`
          }
        });
        console.log(result);

        const userID = await result.json();
        this.setState(
          {
            isLoggedIn: true,
            userID: userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
          },
          () => {
            console.log(this.state);
          }
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleFbLogout = () => {
    window.FB.logout(response => {
      console.log(response);
      this.setState(
        {
          isLoggedIn: false,
          userID: '',
          name: '',
          email: '',
          picture: ''
        },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  handleDeleteFbPermission = async () => {
    let userId = window.FB.getUserID();
    let accessToken = window.FB.getAccessToken();
    await fetch('http://localhost:5000/fbdelete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          id: userId,
          accessToken: accessToken
        }
      })
    });
  };