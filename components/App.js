App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
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
                <p>Search GIF on <a href='http://giphy.com'>giphy</a>. Click ENTER to search next.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
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
          const url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'ZMRtNMz7ZiYIorTWFgMja5xeBARPSblb' + '&tag=' + searchingText; 
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
});