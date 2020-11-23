import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from '@material-ui/lab'

const Heading = styled.div`
    width:50%;
    font-family: 'Rye', cursive;
    font-size: 50px;
    text-align: center;
    margin: 30px auto;
    border-radius: 44px;
    background: #dddedf;
    box-shadow:  41px 41px 35px #bcbdbe, 
             -41px -41px 35px #feffff;
    `
const Plus = styled.button`
    width: 80px;
    height: 80px;
    border: 1px dashed gray;
    border-radius: 50%;
    font-size: 50px;
    text-align:center;
    margin-left: 45%;
    background:#757575;
    cursor: pointer
`
const Flex = styled.div`
    display: flex;
    flex-wrap: wrap
`
const MainWrapper = styled.div`
    width: 350px;
    height: 350px;
    border-radius: 10px;
    text-align:center;
    margin: 50px 50px 50px 70px;
    padding: 10px;
    border-radius: 44px;
    background: #dddedf;
    box-shadow:  41px 41px 35px #bcbdbe, 
                 -41px -41px 35px #feffff;

    :hover{
        transform: scale(1.1);
        transition: transform .9s;
        background-color:#757575;
    box-shadow: none
    }
`
const Fonts = styled.div`
    font-family: 'Dancing Script', cursive;
`
const Button = styled.button`
    padding: 10px;
    margin: 20px;
    width: 60px
`
const Name = styled.div`
    font-family: 'Dancing Script', cursive;
    font-size: 30px;
    margin: 10px;
`

const Image = styled.img`
    border-radius: 50%
`

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            apache: [],
            totalCount: 0
        }
    }

    componentDidMount() {
        this.handleGet()
    }

    handleGet = () => {
        axios.get(`http://localhost:8000/getusers?page=1&limit=5
        `)
            .then((res) => {
                console.log(res)
                this.setState({
                    apache: [...res.data.current],
                    totalCount: res.data.totalCount
                })
            })
            .catch(err => console.log(err))
    }

    handleDelete = (id) => {
        axios({
            method: "delete",
            url: `http://localhost:8000/delete/${id}`
        })
            .then((res) => {
                this.handleGet()
            }).catch(err => console.log(err))
    }

    handlePageChange = (event, value) => {
        axios.get(`http://localhost:8000/getusers?page=${value}&limit=5`)
            .then(res => {
                console.log(res)
                this.setState({
                    apache: [...res.data.current],
                    totalCount: res.data.totalCount
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { apache, totalCount } = this.state
        const { handleDelete } = this
        return (
            <>
                <Heading>Welcome to Apache</Heading>
                <Link to="/add"><Plus>+</Plus></Link>
                <Flex>
                    {apache && apache.map(item => {
                        return (
                            <>
                                <MainWrapper>
                                    <div key={item.name}>
                                        <div><Image src={item.avatar} width="120" /></div>
                                        <Name> {item.name}</Name>
                                        <Fonts>Email:  {item.email}</Fonts>
                                        <Fonts>City:  {item.city}</Fonts>
                                        <Fonts>Blood Group:  {item.bloodGroup}</Fonts>
                                        <Fonts> Gender:  {item.gender}</Fonts>
                                        <Link to={`/${item.email}`}><Button>Edit</Button></Link>
                                        <Button onClick={() => handleDelete(item._id)}>Delete</Button>
                                    </div>
                                </MainWrapper>
                            </>
                        )
                    })}
                </Flex>
                <Pagination count={Math.ceil(totalCount / 5)} variant="outlined" onChange={this.handlePageChange} style={{ width: "400px", margin: "auto", marginBottom: "30px" }} />

            </>
        );
    }
}

export default Dashboard;
