require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const story = require('./models/story')
const storybl = require('./models/block');
const storylin = require('./models/link');
const PORT = process.env.PORT || 5000
const app = express();

try{
    app.listen(PORT, () => console.log(`Server started on ${PORT}s port`))
    sequelize.authenticate()
    console.log('Successful connect!');
}catch(e){
    console.log(e)
}
app.use(express.json())
app.use (express.static('build'));

app.get('/api', async (request, response) => {
    const data = request.query.data;
    const st = await story.findOne({where:{
        authId: `${data}`,
        release: false
    }});
    if (st === null) {
        response.status(200)
        return response.send({ message: "Ошибка!" })
    }else{
    const {count, rows} = await storybl.findAndCountAll({where:{
            authId: data,
            release: false
    },
    order: [
      ['linid', 'ASC']
    ]});
    const blocks = rows;
    var scheme = new Array();
    scheme[0] = new Array();
    scheme[1] = new Array();
    let x = count-1;
    for (let i=0; i <= x; i++){
        const {count, rows} = await storylin.findAndCountAll({where:{
            authId: data,
            release: false,
            storyblId: blocks[i].id
        }})
        scheme[0][i] = new Array();
        let z = count
        for (let j=0; j <= z; j++){
            if (j==0){
            scheme[0][i][j] = {type: 'block', text: blocks[i].bl, id: `bl${blocks[i].linid}`}
            
            }else{
            scheme[0][i][j] = {type: 'link', text: rows[j-1].link, id: `li${rows[j-1].id}`}
            const row = await storybl.findOne({where:{
                linid: rows[j-1].id,
                authId: data,
                release: false
            }})
            if (row != null && row != undefined) {
                scheme[1].push({start: `li${rows[j-1].id}`, end: `bl${rows[j-1].id}`})  
            }
            }
        }
        
    }
    response.status(200) 
    return response.send({ message: scheme})
    }
});

