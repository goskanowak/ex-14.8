App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    
    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif, 
                searchingText: searchingText
            });
        }.bind(this));
      },
    
      getGif: function(searchingText, callback) {
          const GIPHY_API_URL = 'http://api.giphy.com';
          const GIPHY_PUB_KEY = 'ZMRtNMz7ZiYIorTWFgMja5xeBARPSblb';
          const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; 
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onload = function() {
              if (xhr.status === 200) {
                  const data = JSON.parse(xhr.responseText).data;
                  const gif = { 
                      url: data.fixed_width_downsampled_url,
                      sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
    },
    
    render: function() {

        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Search GIF!</h1>
                <p>Search GIF on 
                    <a href='http://giphy.com'>giphy</a>. 
                Click ENTER to search next.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    },
});