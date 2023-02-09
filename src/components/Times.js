import { Card, Avatar, CardHeader, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title, bodytext, imageUrl, userName, isUser, id}) => {
  
    const navigate = useNavigate();
    const handleEdit = (e) => {
        navigate(`/myblogs/${id}`)
    }


    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:3001/api/blog/${id}`).catch(err=>console.log(err));
        
        const data = await res.data;
        return data;
      }

    const handleDelete = (e) => {
        deleteRequest()
            .then(()=>navigate("/"))
            .then(()=>navigate("/blogs"))
            .then(data=>console.log(data));
    }
    return (
        <div>
            <Card sx={{ width: "50%", margin: "auto", mt:2, padding: 2, boxShadow: "10px 10px 20px #ccc;" }}>
            {isUser && (
                <Box display='flex'>
                    <IconButton onClick={handleEdit} sx={{marginLeft: "auto"}}><ModeEditOutlineIcon></ModeEditOutlineIcon></IconButton>
                    <IconButton onClick={handleDelete}><DeleteForeverIcon></DeleteForeverIcon></IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {userName}
                </Avatar>
                }
                title={title}
            />
            <CardMedia
                component="img"
                height="194"
                image={imageUrl}
                alt="Paella dish"
            />
            <CardContent >
                <Typography variant="body2" color="text.secondary">
                {bodytext}
                </Typography>
            </CardContent>
            </Card>
        </div>
    )
}

export default Blog