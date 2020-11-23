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
export default class Add extends React.Component {
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


    handleAdd = () => {

        const { name, email, avatar, bloodGroup, gender, city } = this.state
        axios({
            method: "post",
            url: `http://localhost:8000/adduser`,
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
                alert("Data added!")
            }).catch(err => console.log(err))
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <Heading>Add Data</Heading>
                <MainWrapper>
                    <Wrapper>
                        <Label>Name:
                            <input placeholder="Enter name" name="name" onChange={this.handleChange}></input>
                        </Label>
                    </Wrapper>

                    <Wrapper>
                        <Label>Email:
                            <input placeholder="Enter name" name="email" onChange={this.handleChange}></input>
                        </Label>
                    </Wrapper>

                    <Wrapper>
                        <Label>Gender:
                            <input placeholder="Enter name" name="gender" onChange={this.handleChange}></input>
                        </Label>
                    </Wrapper>

                    <Wrapper>
                        <Label>City:
                            <input placeholder="Enter name" name="city" onChange={this.handleChange}></input>
                        </Label>
                    </Wrapper>

                    <Wrapper>
                        <Label>Blood Group:
                            <input placeholder="Enter name" name="bloodGroup" onChange={this.handleChange}></input>
                        </Label>
                    </Wrapper>

                    <Wrapper>
                        <Label>Avatar:
                            <input placeholder="Enter name" name="avatar" onChange={this.handleChange}></input>
                        </Label>
                    </Wrapper>

                    <Wrapper>
                        <Button onClick={this.handleAdd}>Add </Button>
                    </Wrapper>
                </MainWrapper>
            </div>


        )
    }
}
