import React from 'react'
import axios from 'axios'
import styled from "styled-components"

const MainWrapper = styled.div`
    width: 70%;
    height: 70%;
    border: 1px solid gray;
    margin: auto;
    padding: 10px;
    box-shadow: 5px 10px #888888;
`
const Heading = styled.div`
    text-align:center;
    font-family: 'Ma Shan Zheng', cursive;
    font-size: 35px;
    margin: 30px;
`
const Wrapper = styled.div`
    margin: 20px;
    text-align: center;
`
const Label = styled.label`
    font-family: 'Dancing Script', cursive;
    font-size: 20px;
`
const Button = styled.button`
    margin: 20px;
    padding: 10px;
    margin:auto;
`

export default class Edit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isEdit: true,
            student: [],
            name: "",
            email: "",
            city: "",
            bloodGroup: "",
            avatar: "",
            gender: ""
        }
    }

    componentDidMount() {
        let data = this.props.match.url
        let email = data.split("").splice(1).join("")

        axios({
            method: "put",
            url: `http://localhost:8000/student/${email}`,
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    student: [res.data]
                })
            }).catch(err => console.log(err))
    }

    handleUpdate = (item) => {
        let data = this.props.match.url
        let prevEmail = data.split("").splice(1).join("")
        const { name, email, avatar, bloodGroup, gender, city } = this.state
        console.log(item)
        axios({
            method: "put",
            url: `http://localhost:8000/update/${prevEmail}`,
            data: {
                name: name,
                email: email,
                bloodGroup: bloodGroup,
                city: city,
                gender: gender,
                avatar: avatar
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    student: [res.data],
                    isEdit: false
                })
            }).catch(err => console.log(err))
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { isEdit, student } = this.state
        if (isEdit) {
            return (
                <div>
                    {student && student.map(item => {
                        return (
                            <>
                                <div>
                                    <Heading>Edit & Update Data</Heading>
                                    <MainWrapper>
                                        <Wrapper>
                                            <Label>Name:
                                            <input placeholder={item.name} name="name" onChange={this.handleChange}></input>
                                            </Label>
                                        </Wrapper>

                                        <Wrapper>
                                            <Label>Email:
                                            <input placeholder={item.email} name="email" onChange={this.handleChange}></input>
                                            </Label>
                                        </Wrapper>

                                        <Wrapper>
                                            <Label>Gender:
                                            <input placeholder={item.gender} name="gender" onChange={this.handleChange}></input>
                                            </Label>
                                        </Wrapper>

                                        <Wrapper>
                                            <Label>City: <input placeholder={item.city} name="city" onChange={this.handleChange}></input></Label>
                                        </Wrapper>

                                        <Wrapper>
                                            <Label>Blood Group: <input placeholder={item.bloodGroup} name="bloodGroup" onChange={this.handleChange}></input></Label>
                                        </Wrapper>
                                        <Wrapper>
                                            <Label>Avatar: <input placeholder={item.avatar} name="avatar" onChange={this.handleChange}></input></Label>
                                        </Wrapper>
                                        <Wrapper>
                                            <Button onClick={() => { this.handleUpdate(item) }}>Update
                                            </Button>
                                        </Wrapper>
                                    </MainWrapper>
                                </div>
                            </>
                        )
                    })}
                </div>
            )
        }
        else {
            return (

                <h1>Updated Successfully!</h1>
            )
        }
    }
}
