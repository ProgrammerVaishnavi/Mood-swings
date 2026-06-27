const moods = {
  happy: {
    id: "happy",
    title: "Happy Vibes",
    description: "Upbeat songs to brighten your day and lift your spirits",
    color: "#f5c542",
    bgImage: "happy.jpg",
    songs: [
      { title: "Happy", artist: "Pharrell Williams", youtubeId: "y6Sxv-sUYtM", cover: "happy.jpg" },
      { title: "Can't Stop the Feeling", artist: "Justin Timberlake", youtubeId: "ru0K8uYEZWw", cover: "happy.jpg" },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", youtubeId: "OPf0YbXqDm0", cover: "happy.jpg" },
      { title: "Sugar", artist: "Maroon 5", youtubeId: "09R8_2nJtjg", cover: "happy.jpg" },
      { title: "Shake It Off", artist: "Taylor Swift", youtubeId: "nfWlot6h_JM", cover: "happy.jpg" },
      { title: "Party Rock Anthem", artist: "LMFAO", youtubeId: "KQ6zr6kCPj8", cover: "happy.jpg" },
      { title: "I Gotta Feeling", artist: "Black Eyed Peas", youtubeId: "uSD4vsh1zDA", cover: "happy.jpg" },
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", youtubeId: "iPUmE-jnhA4", cover: "happy.jpg" },
      { title: "Good Time", artist: "Owl City & Carly Rae Jepsen", youtubeId: "H7HmzwP7i1E", cover: "happy.jpg" },
      { title: "On Top of the World", artist: "Imagine Dragons", youtubeId: "w5tWYmI4G0E", cover: "happy.jpg" }
    ]
  },
  sad: {
    id: "sad",
    title: "Melancholy Moments",
    description: "Songs that understand your feelings and let you embrace them",
    color: "#5c7a9e",
    bgImage: "sad.jpg",
    songs: [
      { title: "Someone Like You", artist: "Adele", youtubeId: "hLQl3WQQoQ0", cover: "sad.jpg" },
      { title: "When I Was Your Man", artist: "Bruno Mars", youtubeId: "ekzHIouo8To", cover: "sad.jpg" },
      { title: "Let Her Go", artist: "Passenger", youtubeId: "RBumgq5yVrA", cover: "sad.jpg" },
      { title: "Fix You", artist: "Coldplay", youtubeId: "k4V3Mo61fJM", cover: "sad.jpg" },
      { title: "Stay With Me", artist: "Sam Smith", youtubeId: "iBepWkZXf_s", cover: "sad.jpg" },
      { title: "The Night We Met", artist: "Lord Huron", youtubeId: "Kt_TjWrvcoo", cover: "sad.jpg" },
      { title: "Say Something", artist: "A Great Big World", youtubeId: "xJMa3GmTz1c", cover: "sad.jpg" },
      { title: "The Scientist", artist: "Coldplay", youtubeId: "RB-RcX5DS5A", cover: "sad.jpg" },
      { title: "Hurt", artist: "Johnny Cash", youtubeId: "8AHCfZTj4eA", cover: "sad.jpg" },
      { title: "Creep", artist: "Radiohead", youtubeId: "XFkzRNyygfk", cover: "sad.jpg" }
    ]
  },
  romantic: {
    id: "romantic",
    title: "Romantic Beats",
    description: "Love songs that set the perfect mood for special moments",
    color: "#e84a5f",
    bgImage: "romantic.jpg",
    songs: [
      { title: "Perfect", artist: "Ed Sheeran", youtubeId: "iKzRIweSBLA", cover: "romantic.jpg" },
      { title: "A Thousand Years", artist: "Christina Perri", youtubeId: "rtOvBOTyX00", cover: "romantic.jpg" },
      { title: "Thinking Out Loud", artist: "Ed Sheeran", youtubeId: "lp-EO5I60KA", cover: "romantic.jpg" },
      { title: "Just the Way You Are", artist: "Bruno Mars", youtubeId: "LjhCEhWiKXk", cover: "romantic.jpg" },
      { title: "Love Me Like You Do", artist: "Ellie Goulding", youtubeId: "AJtDXIazr1o", cover: "romantic.jpg" },
      { title: "At Last", artist: "Etta James", youtubeId: "S-cbOl96RFM", cover: "romantic.jpg" },
      { title: "Make You Feel My Love", artist: "Adele", youtubeId: "0put0ya--hE", cover: "romantic.jpg" },
      { title: "Can't Help Falling in Love", artist: "Elvis Presley", youtubeId: "vGJTaP6inOU", cover: "romantic.jpg" },
      { title: "Unchained Melody", artist: "Righteous Brothers", youtubeId: "qiiyq2xr4T0", cover: "romantic.jpg" },
      { title: "My Heart Will Go On", artist: "Celine Dion", youtubeId: "3gCilSg1fgc", cover: "romantic.jpg" }
    ]
  },
  motivated: {
    id: "motivated",
    title: "Motivation Boost",
    description: "Powerful anthems to push you forward and achieve greatness",
    color: "#f39c12",
    bgImage: "motivated.jpg",
    songs: [
      { title: "Lose Yourself", artist: "Eminem", youtubeId: "xFYQQPAOz7Y", cover: "motivated.jpg" },
      { title: "Eye of the Tiger", artist: "Survivor", youtubeId: "btPJPFnesV4", cover: "motivated.jpg" },
      { title: "Stronger", artist: "Kanye West", youtubeId: "PsO6ZnUZI0g", cover: "motivated.jpg" },
      { title: "Hall of Fame", artist: "The Script ft. will.i.am", youtubeId: "mk48xRzuNvA", cover: "motivated.jpg" },
      { title: "Believer", artist: "Imagine Dragons", youtubeId: "7wtfhZwyrcc", cover: "motivated.jpg" },
      { title: "We Will Rock You", artist: "Queen", youtubeId: "-tJYN-eG1zk", cover: "motivated.jpg" },
      { title: "Don't Stop Believin'", artist: "Journey", youtubeId: "1k8craCGpgs", cover: "motivated.jpg" },
      { title: "Unstoppable", artist: "Sia", youtubeId: "YaEG2e3LZqU", cover: "motivated.jpg" },
      { title: "The Climb", artist: "Miley Cyrus", youtubeId: "NG2zyUE5N9o", cover: "motivated.jpg" },
      { title: "Fight Song", artist: "Rachel Platten", youtubeId: "xn_9hV5SJNk", cover: "motivated.jpg" }
    ]
  },
  energetic: {
    id: "energetic",
    title: "High Energy",
    description: "Non-stop bangers to get your heart pumping and feet moving",
    color: "#e67e22",
    bgImage: "energetic.jpg",
    songs: [
      { title: "One More Time", artist: "Daft Punk", youtubeId: "FGBhQbmPwH8", cover: "energetic.jpg" },
      { title: "Wake Me Up", artist: "Avicii", youtubeId: "IcrbM1l_BoI", cover: "energetic.jpg" },
      { title: "Titanium", artist: "David Guetta ft. Sia", youtubeId: "JRfuAukYTKg", cover: "energetic.jpg" },
      { title: "Levels", artist: "Avicii", youtubeId: "_ovdm2yX4MA", cover: "energetic.jpg" },
      { title: "Don't Let Me Down", artist: "The Chainsmokers", youtubeId: "Io0fBr1XB2Y", cover: "energetic.jpg" },
      { title: "Closer", artist: "The Chainsmokers ft. Halsey", youtubeId: "PT2_F-1esPk", cover: "energetic.jpg" },
      { title: "Lean On", artist: "Major Lazer ft. MØ", youtubeId: "YqeW9_5kURI", cover: "energetic.jpg" },
      { title: "This Is What You Came For", artist: "Calvin Harris ft. Rihanna", youtubeId: "na7lIb09898", cover: "energetic.jpg" },
      { title: "Rather Be", artist: "Clean Bandit ft. Jess Glynne", youtubeId: "m-M1AtrxztU", cover: "energetic.jpg" },
      { title: "Summer", artist: "Calvin Harris", youtubeId: "ebXbLfLACGM", cover: "energetic.jpg" }
    ]
  }
};
