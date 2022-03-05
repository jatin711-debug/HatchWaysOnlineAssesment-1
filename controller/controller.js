const { getTags, addNewPosts, verifyDirection, verifySorting} = require('../utils/utils');
const NodeCache = require('node-cache');
const serverCache = new NodeCache({stdTTL:10});
require('dotenv').config();

const axios = require('axios');

let posts = [];

exports.ping = async (req, res) => {
    res.status(200).send({Success: true});
};

exports.posts =  async (req, res) => {

        const tags = getTags(req.query.tags);
        
        const requests = await tags.map((tag) =>
          axios.get("https://api.hatchways.io/assessment/blog/posts?tag=" + tag)
        );
        try {
          const result = await Promise.all(requests);
          result.map((item) => {
            posts = addNewPosts(posts, item.data.posts);
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Error" });3
        }

        if(req.query.sortBy || req.query.direction) {
          const sortValue = req.query.sortBy;
          const direction = req.query.direction;
          if(sortValue !== undefined && sortValue !== null){
            const response = await verifySorting(sortValue);
            if(response === false) res.send({error: " Invalid SortBy Property"});

            posts.sort((a,b) => a[`${ sortValue }` || "id"] < b[`${sortValue}` || "id"] ? 1 : -1 );
          }
          if(direction !== undefined && direction !== null){
            const response = await verifyDirection(direction);
            if(response === false) res.send({error: " Invalid Direction Property"});
            if(direction == "desc"){
                posts.sort((a,b) => a[`${ sortValue }` || "id"] < b[`${sortValue}` || "id"] ? 1 : -1 );
              }else{
                posts.sort((a,b) => a[`${sortValue}`] > b[`${sortValue}`] ? 1 : -1 );
              }
            }
        }
        return res.status(200).send({ posts: posts });
};
