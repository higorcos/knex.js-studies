const database = require('./database');


// .toQuery() - mostrar a query
/*
Insert

*/
const dataInsert = {
        nome: "Call of Duty",
        preco: '84,99'   
    }

const dataMultiInsert = [
{
    nome: "Call of Duty",
    preco: '84,99'   
},
{
    nome: "Call of Duty 2",
    preco: '84,99'   
}
]

database.insert(dataMultiInsert).into('games').then((data)=>{
    console.log('Sucesso')
    console.log(data)

}).catch((error)=>{
    console.log('err')
    console.log(error)

})


/*
Select
*/

database.select(["id",'preco']).into('games').then((data)=>{
    console.log('Sucesso')
    console.log(data)
}).catch((error)=>{
    console.log('erro')
    console.log(error)
})
const a = async ()=>{
    const b =  await database.select(["id",'preco']).into('games').orderBy('preco','asc')

    try{
        console.log('Deu certo')
        console.log(b)
    }catch{
        console.log('Deu errado')
        // console.log(b)

    }

}
a()


/*
Multi query  

    where diferentes  .whereRaw()
    like, <, <= , =>

    OU

    SQL DIferentes
    .raw('SQL AQUI')

*/

{

    var query =  database.select(["id",'preco']).where({id: 3}).table('games')
    console.log(query.toQuery())    
}

{
    
    const b = async ()=>{
    var query = await  database.select().whereRaw(`nome LIKE '%Duty 2%' `).table('games')
        // console.log(query.toQuery())    
        console.log(query)
    }
    b()
}



/*
    Deletar dados
    database.where().delete().table

*/
/*
database.whereRaw('id < 5').delete().table('games').then((data)=>{
    console.log(data);
}).catch((erro)=>{
    console.log(erro);
})
*/
/*
    UPDATE

*/

database.where({id:5}).update({nome:'GTA V', preco: 50}).table('games').then((data)=>{
        console.log(data);
    }).catch((erro)=>{
        console.log(erro);
    })

    database.where({nome: 'Call of Duty'}).update({preco: '49,99'}).table('games').then((data)=>{
        console.log(data);
    }).catch((erro)=>{
        console.log(erro);
    })
    
    database.where({nome: 'Call of Duty 2'}).update({preco: '94,99'}).table('games').then((data)=>{
        console.log(data);
    }).catch((erro)=>{
        console.log(erro);
    })


/* 
    Join
*/



const dataStudios = {
    nome: 'EPIC',
    game_id: 5
}
database.select(["games.*", "estudios.nome as estudios_nome"]).table("games").innerJoin("estudios","estudios.game_id","games.id").where('games.id',5).then((data)=>{
    
    console.log('Sucesso')
    console.log(data)

    const estudiosArray = data;
    const game = {
        id: 0,
        nome: '',
        estudios: []
    }

    game.id = data[0].id;
    game.nome = data[0].nome; 
    game.preco = data[0].preco; 

    data.forEach(element => {
        game.estudios.push({nome: element.estudios_nome})
    });
    console.log(game)

}).catch((error)=>{
    console.log('err')
    console.log(error)

})




/*
    transacion
*/


const transacion = async ()=>{
    try{
        await database.transaction(async trans =>{
            const a = await database.insert({nome:"Qualquer nome"}).table("estudios");
            const b = await database.insert({nome:"Qualquer nome 2"}).table("estudios");
        console.log(a)
        console.log(b)

        })
    }catch(err){
        console.log(err)
    }
}

transacion();


