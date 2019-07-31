import React from 'react'
import {
    Image,
    Dimensions,
    View,
    ActivityIndicator
} from 'react-native'
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Left
} from 'native-base'
import Moment from 'moment'
import HTML from 'react-native-render-html'

class App extends React.Component {
    // Deklarasikan Constructor dan states untuk menyimpan data API(Posting Data)
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    // Deklarasi agar script ini di load pertama kali ketika aplikasi di buka
    ComponentDidMount() {
        fetch('https://www.medanmengaji.com/wp-json/wp/v2/posts?_embad')
            .then((response) => response())
            .then((responseJson) => {
                console.log(response)
                this.setState({
                    isLoading: false,
                    posts: responseJson,
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {

        // Mengembalikan atau menampilkan activityIndicator jika keadaan isLoging benar. ini berarti wp-api belum diambil oleh aplikasi 
        if (this.state.isLoading == true) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color='#1C97F7' />
                </View>
            )
        }
        else {
            Moment.locale('en')
            return (
                <Container>
                    <Header androidStatusBarColor='#004447' style={{ backgroundColor: '#006064' }}>
                        <Body style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Title> Medan Mengaji</Title>
                        </Body>
                    </Header>

                    <Content>
                        {this.state.posts.map((item, index) => (
                            <Card style={{ flex: 0 }} key={item.id}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                                {/* {item.title.} */}
                                            </Text>
                                            <Text note>Published on: {Moment(item.date).format('d MMM Y')}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>

                        ))}
                    </Content>
                </Container>

            )
        }
    }
}


export default App;