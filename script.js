let ids_alunos_faltaram = [];
let flag_carregou_turma = false;

function abreNav(){
    let nav = document.getElementById("background_nav");
    nav.style.display = "flex";
}

function fechaNav(){
    let nav = document.getElementById("background_nav");
    nav.style.display = "none";
}

function abrePagRelatorio(){
    let pag_relatorio = document.getElementById("background_pag_relatorio");
    pag_relatorio.style.display = "flex";
    let nav = document.getElementById("background_nav");
    nav.style.display = "none";
}

function fechaPagRelatorio(){
    let pag_relatorio = document.getElementById("background_pag_relatorio");
    pag_relatorio.style.display = "none";
}

function abrePagAjustes(){
    let pag_ajustes = document.getElementById("background_pag_ajustes");
    pag_ajustes.style.display = "flex";
    let nav = document.getElementById("background_nav");
    nav.style.display = "none";
}

function fechaPagAjustes(){
    let pag_ajustes = document.getElementById("background_pag_ajustes");
    pag_ajustes.style.display = "none";
}

function getAlunos(){
    let turma_selecionada = document.getElementById("turma_selecionada_pag_inicial").value;
    if (!flag_carregou_turma) {
        fetch('http://localhost:3000/api/alunos/' + turma_selecionada)
	.then(function (resposta) {
        console.log(resposta);
		return resposta.json();
	})
	.then(function (dados) {
        console.log(dados);
        console.log(dados.result.length)

        dados.result.forEach(function(aluno){
            var alunoDiv = document.createElement('button');
            alunoDiv.classList.add("aluno_pagina_inicial");
            var alunoIdDiv = document.createElement('article');
            var alunoNomeDiv = document.createElement('article');
            var alunoFaltasDiv = document.createElement('article');
            alunoIdDiv.appendChild(document.createTextNode(aluno.id_aluno));
            alunoNomeDiv.appendChild(document.createTextNode(aluno.nome_aluno));
            alunoDiv.appendChild(alunoIdDiv);
            alunoDiv.appendChild(alunoNomeDiv);
            alunoDiv.appendChild(alunoFaltasDiv);
            document.getElementById('campo_turma').appendChild(alunoDiv);
            
            let flag_faltou = false;

            alunoDiv.onclick = function() {
                    if (!flag_faltou) {
                        alunoDiv.classList.remove("aluno_pagina_inicial");
                        alunoDiv.classList.add("aluno_pagina_inicial_falta");
                        alunoFaltasDiv.innerHTML = "Faltou!";
    
                        var id_aluno_div = alunoIdDiv.childNodes[0];
                        if (id_aluno_div.nodeName === "#text") {
                            ids_alunos_faltaram.push(id_aluno_div.nodeValue);
                            console.log(ids_alunos_faltaram);
                        }
    
                        flag_faltou = true;
                    } else {
                        alunoDiv.classList.remove("aluno_pagina_inicial_falta");
                        alunoDiv.classList.add("aluno_pagina_inicial");
                        alunoFaltasDiv.innerHTML = "";
    
                        var id_aluno_div = alunoIdDiv.childNodes[0];
                        if (id_aluno_div.nodeName === "#text") {
                            index_do_aluno = ids_alunos_faltaram.indexOf(id_aluno_div.nodeValue);
                            ids_alunos_faltaram.splice(index_do_aluno, 1);
                            console.log(ids_alunos_faltaram);
                        }
                        
                        flag_faltou = false;
                    }
            }
        })
	})
    flag_carregou_turma = true;
    }
}

function aplicaFaltas(){
    let professor_selecionado = document.getElementById("professor_selecionado_pag_inicial").value;
    let materia_selecionada = document.getElementById("materia_selecionada_pag_inicial").value;
    let body_request = {
        nome_aluno: "nome_decoy",
        n_de_faltas: 0
    }
    if(materia_selecionada == "" || professor_selecionado == ""){
        alert("Selecione uma matéria e um professor.")
    } else {
        for (let i = 0; i < ids_alunos_faltaram.length; i++) {
            let id_aluno_que_faltou = ids_alunos_faltaram[i];
            fetch("http://localhost:3000/api/aluno/adicionar-falta/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            if (materia_selecionada == "Inglês"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-ing/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "Ed.Física"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-edf/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "Português"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-port/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
                fetch("http://localhost:3000/api/aluno/adicionar-falta-rest/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "Matemática"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-mat/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
                fetch("http://localhost:3000/api/aluno/adicionar-falta-rest/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "Artes"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-art/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
                fetch("http://localhost:3000/api/aluno/adicionar-falta-rest/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "História"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-hist/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
                fetch("http://localhost:3000/api/aluno/adicionar-falta-rest/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "Ciências"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-cie/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
                fetch("http://localhost:3000/api/aluno/adicionar-falta-rest/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            } else if (materia_selecionada == "Geografia"){
                fetch("http://localhost:3000/api/aluno/adicionar-falta-geo/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
                fetch("http://localhost:3000/api/aluno/adicionar-falta-rest/" + id_aluno_que_faltou, {method: "PUT", body: JSON.stringify(body_request)});
            }
        }
    
        alert("Faltas aplicadas!");
        window.location.reload();
    }
}

function geraRelatorioProfessor(){
    let professor_selecionado = document.getElementById("professor_selecionado_pag_relatorio").value;
    let turma;
    let professor_de_turma = false;

    if (professor_selecionado == "João Silva"){
        turma = 1
        professor_de_turma = true;
    } else if (professor_selecionado == "Maria Souza"){
        turma = 2
        professor_de_turma = true;
    } else if (professor_selecionado == "Lucas Felipe"){
        turma = 3
        professor_de_turma = true;
    } else if (professor_selecionado == "Luis Lima"){
        turma = 4
        professor_de_turma = true;
    } else if (professor_selecionado == "Geraldo Alckmin"){
        turma = 5
        professor_de_turma = true;
    }

    if (professor_de_turma == true){
        fetch("http://localhost:3000/api/alunos-prof/" + turma)
	.then(function (resposta) {
        console.log(resposta);
		return resposta.json();
	})
	.then(function (dados) {
        console.log(dados);
        console.log(dados.result.length)

        var tituloDiv = document.createElement('div');
        var textoTituloDiv = document.createElement('article');
        tituloDiv.classList.add("aluno_pagina_inicial");
        textoTituloDiv.appendChild(document.createTextNode("Relatório de professor: " + professor_selecionado))
        tituloDiv.appendChild(textoTituloDiv);
        document.getElementById('relatorio').appendChild(tituloDiv);

        var legendaDiv = document.createElement('div');
        legendaDiv.classList.add("aluno_pagina_inicial");
        var alunoIdDiv = document.createElement('article');
        var alunoNomeDiv = document.createElement('article');
        var alunoFaltasDiv = document.createElement('article');
        alunoIdDiv.appendChild(document.createTextNode("RA"));
        alunoNomeDiv.appendChild(document.createTextNode("Nome"));
        alunoFaltasDiv.appendChild(document.createTextNode("Faltas aplicadas pelo prof."));
        legendaDiv.appendChild(alunoIdDiv);
        legendaDiv.appendChild(alunoNomeDiv);
        legendaDiv.appendChild(alunoFaltasDiv);
        document.getElementById('relatorio').appendChild(legendaDiv);

        dados.result.forEach(function(aluno){
            var alunoDiv = document.createElement('button');
            alunoDiv.classList.add("aluno_pagina_inicial");
            var alunoIdDiv = document.createElement('article');
            var alunoNomeDiv = document.createElement('article');
            var alunoFaltasDiv = document.createElement('article');
            alunoIdDiv.appendChild(document.createTextNode(aluno.id_aluno));
            alunoNomeDiv.appendChild(document.createTextNode(aluno.nome_aluno));
            alunoFaltasDiv.appendChild(document.createTextNode(aluno.faltas_rest));
            alunoDiv.appendChild(alunoIdDiv);
            alunoDiv.appendChild(alunoNomeDiv);
            alunoDiv.appendChild(alunoFaltasDiv);
            document.getElementById('relatorio').appendChild(alunoDiv);
        })
        var barraDeSeparacao = document.createElement("div");
        barraDeSeparacao.classList.add("barraDeSeparacao");
        document.getElementById('relatorio').appendChild(barraDeSeparacao);
	})
    } else {
        let materia_do_prof;
        if (professor_selecionado == "Neymar JR"){
            materia_do_prof = "edf";
        } else if (professor_selecionado == "Joe Biden"){
            materia_do_prof = "ing";
        }

        fetch('http://localhost:3000/api/alunosfaltas' + materia_do_prof)
	.then(function (resposta) {
        console.log(resposta);
		return resposta.json();
	})
	.then(function (dados) {
        console.log(dados);
        console.log(dados.result.length)

        var tituloDiv = document.createElement('div');
        tituloDiv.classList.add("aluno_pagina_inicial");
        tituloDiv.appendChild(document.createTextNode("Relatório de professor: " + professor_selecionado));
        document.getElementById('relatorio').appendChild(tituloDiv);

        var legendaDiv = document.createElement('div');
        legendaDiv.classList.add("aluno_pagina_inicial");
        var alunoIdDiv = document.createElement('article');
        var alunoNomeDiv = document.createElement('article');
        var alunoMateriaDiv = document.createElement('article');
        alunoIdDiv.appendChild(document.createTextNode("RA"));
        alunoNomeDiv.appendChild(document.createTextNode("Nome"));
        alunoMateriaDiv.appendChild(document.createTextNode("Faltas aplicadas pelo prof."));
        legendaDiv.appendChild(alunoIdDiv);
        legendaDiv.appendChild(alunoNomeDiv);
        legendaDiv.appendChild(alunoMateriaDiv);
        document.getElementById('relatorio').appendChild(legendaDiv);

        dados.result.forEach(function(aluno){
            var alunoDiv = document.createElement('button');
            alunoDiv.classList.add("aluno_pagina_inicial");
            var alunoIdDiv = document.createElement('article');
            var alunoNomeDiv = document.createElement('article');
            var alunoMateriaDiv = document.createElement('article');
            alunoIdDiv.appendChild(document.createTextNode(aluno.id_aluno));
            alunoNomeDiv.appendChild(document.createTextNode(aluno.nome_aluno));
            if (materia_do_prof == "edf"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_edf));
            } else if (materia_do_prof == "ing"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_ing));
            }
            alunoDiv.appendChild(alunoIdDiv);
            alunoDiv.appendChild(alunoNomeDiv);
            alunoDiv.appendChild(alunoMateriaDiv);
            document.getElementById('relatorio').appendChild(alunoDiv);
        })
        var barraDeSeparacao = document.createElement("div");
        barraDeSeparacao.classList.add("barraDeSeparacao");
        document.getElementById('relatorio').appendChild(barraDeSeparacao);
	})
    }
}

function geraRelatorioTurma(){
    let turma_selecionada = document.getElementById("turma_selecionada_pag_relatorio").value;
        fetch('http://localhost:3000/api/alunos/' + turma_selecionada)
	.then(function (resposta) {
        console.log(resposta);
		return resposta.json();
	})
	.then(function (dados) {
        console.log(dados);
        console.log(dados.result.length)

        var tituloDiv = document.createElement('div');
        var textoTituloDiv = document.createElement('article');
        tituloDiv.classList.add("aluno_pagina_inicial");
        textoTituloDiv.appendChild(document.createTextNode("Relatório de turma: " + turma_selecionada + "º ano"))
        tituloDiv.appendChild(textoTituloDiv);
        document.getElementById('relatorio').appendChild(tituloDiv);

        var legendaDiv = document.createElement('div');
        legendaDiv.classList.add("aluno_pagina_inicial");
        var alunoIdDiv = document.createElement('article');
        var alunoNomeDiv = document.createElement('article');
        var alunoFaltasDiv = document.createElement('article');
        alunoIdDiv.appendChild(document.createTextNode("RA"));
        alunoNomeDiv.appendChild(document.createTextNode("Nome"));
        alunoFaltasDiv.appendChild(document.createTextNode("Faltas totais"));
        legendaDiv.appendChild(alunoIdDiv);
        legendaDiv.appendChild(alunoNomeDiv);
        legendaDiv.appendChild(alunoFaltasDiv);
        document.getElementById('relatorio').appendChild(legendaDiv);

        dados.result.forEach(function(aluno){
            var alunoDiv = document.createElement('button');
            alunoDiv.classList.add("aluno_pagina_inicial");
            var alunoIdDiv = document.createElement('article');
            var alunoNomeDiv = document.createElement('article');
            var alunoFaltasDiv = document.createElement('article');
            alunoIdDiv.appendChild(document.createTextNode(aluno.id_aluno));
            alunoNomeDiv.appendChild(document.createTextNode(aluno.nome_aluno));
            alunoFaltasDiv.appendChild(document.createTextNode(aluno.n_de_faltas));
            alunoDiv.appendChild(alunoIdDiv);
            alunoDiv.appendChild(alunoNomeDiv);
            alunoDiv.appendChild(alunoFaltasDiv);
            document.getElementById('relatorio').appendChild(alunoDiv);
        })
        var barraDeSeparacao = document.createElement("div");
        barraDeSeparacao.classList.add("barraDeSeparacao");
        document.getElementById('relatorio').appendChild(barraDeSeparacao);
	})
}

function geraRelatorioMateria(){
    let materia_selecionada = document.getElementById("materia_selecionada_pag_relatorio").value;
    let materia_selecionada_texto;
    if (materia_selecionada == "port"){
        materia_selecionada_texto = "Português";
    } else if (materia_selecionada == "art"){
        materia_selecionada_texto = "Artes";
    } else if (materia_selecionada == "hist"){
        materia_selecionada_texto = "História";
    } else if (materia_selecionada == "cie"){
        materia_selecionada_texto = "Ciências";
    } else if (materia_selecionada == "mat"){
        materia_selecionada_texto = "Matemática";
    } else if (materia_selecionada == "geo"){
        materia_selecionada_texto = "Geografia";
    } else if (materia_selecionada == "ing"){
        materia_selecionada_texto = "Inglês";
    } else if (materia_selecionada == "edf"){
        materia_selecionada_texto = "Educação física";
    }
    fetch('http://localhost:3000/api/alunosfaltas' + materia_selecionada)
	.then(function (resposta) {
        console.log(resposta);
		return resposta.json();
	})
	.then(function (dados) {
        console.log(dados);
        console.log(dados.result.length)

        var tituloDiv = document.createElement('div');
        tituloDiv.classList.add("aluno_pagina_inicial");
        tituloDiv.appendChild(document.createTextNode("Relatório de matéria: " + materia_selecionada_texto));
        document.getElementById('relatorio').appendChild(tituloDiv);

        var legendaDiv = document.createElement('div');
        legendaDiv.classList.add("aluno_pagina_inicial");
        var alunoIdDiv = document.createElement('article');
        var alunoNomeDiv = document.createElement('article');
        var alunoMateriaDiv = document.createElement('article');
        alunoIdDiv.appendChild(document.createTextNode("RA"));
        alunoNomeDiv.appendChild(document.createTextNode("Nome"));
        alunoMateriaDiv.appendChild(document.createTextNode("Faltas de " + materia_selecionada_texto));
        legendaDiv.appendChild(alunoIdDiv);
        legendaDiv.appendChild(alunoNomeDiv);
        legendaDiv.appendChild(alunoMateriaDiv);
        document.getElementById('relatorio').appendChild(legendaDiv);

        dados.result.forEach(function(aluno){
            var alunoDiv = document.createElement('button');
            alunoDiv.classList.add("aluno_pagina_inicial");
            var alunoIdDiv = document.createElement('article');
            var alunoNomeDiv = document.createElement('article');
            var alunoMateriaDiv = document.createElement('article');
            alunoIdDiv.appendChild(document.createTextNode(aluno.id_aluno));
            alunoNomeDiv.appendChild(document.createTextNode(aluno.nome_aluno));
            if (materia_selecionada_texto == "Português"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_port));
            } else if (materia_selecionada_texto == "Artes"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_art));
            } else if (materia_selecionada_texto == "História"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_hist));
            } else if (materia_selecionada_texto == "Ciências"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_cie));
            } else if (materia_selecionada_texto == "Matemática"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_mat));
            } else if (materia_selecionada_texto == "Geografia"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_geo));
            } else if (materia_selecionada_texto == "Inglês"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_ing));
            } else if (materia_selecionada_texto == "Educação física"){
                alunoMateriaDiv.appendChild(document.createTextNode(aluno.falta_edf));
            }
            alunoDiv.appendChild(alunoIdDiv);
            alunoDiv.appendChild(alunoNomeDiv);
            alunoDiv.appendChild(alunoMateriaDiv);
            document.getElementById('relatorio').appendChild(alunoDiv);
        })
        var barraDeSeparacao = document.createElement("div");
        barraDeSeparacao.classList.add("barraDeSeparacao");
        document.getElementById('relatorio').appendChild(barraDeSeparacao);
	})
}

function trazFaltasAluno(){
    console.log(document.getElementById("aluno_buscado").value);

    fetch('http://localhost:3000/api/aluno/' + document.getElementById("aluno_buscado").value)
    .then(function (resposta) {
        console.log(resposta);  
		return resposta.json();
	})
	.then(function (dados) {
        console.log(dados);

        var tituloDiv = document.createElement('div');
        tituloDiv.classList.add("aluno_pagina_inicial");
        tituloDiv.appendChild(document.createTextNode("Relatório de aluno: " + document.getElementById("aluno_buscado").value));
        document.getElementById('relatorio').appendChild(tituloDiv);

        var legendaDiv = document.createElement('div');
        legendaDiv.classList.add("aluno_pagina_inicial");
        var alunoIdDiv = document.createElement('article');
        var alunoNomeDiv = document.createElement('article');
        var alunoFaltasDiv = document.createElement('article');
        alunoIdDiv.appendChild(document.createTextNode("RA"));
        alunoNomeDiv.appendChild(document.createTextNode("Nome"));
        alunoFaltasDiv.appendChild(document.createTextNode("Faltas totais"));
        legendaDiv.appendChild(alunoIdDiv);
        legendaDiv.appendChild(alunoNomeDiv);
        legendaDiv.appendChild(alunoFaltasDiv);
        document.getElementById('relatorio').appendChild(legendaDiv);

        var alunoDiv = document.createElement('button');
        alunoDiv.classList.add("aluno_pagina_inicial");
        var alunoIdDiv = document.createElement('article');
        var alunoNomeDiv = document.createElement('article');
        var alunoFaltasDiv = document.createElement('article');
        alunoIdDiv.appendChild(document.createTextNode(dados.result.id_aluno));
        alunoNomeDiv.appendChild(document.createTextNode(dados.result.nome_aluno));
        alunoFaltasDiv.appendChild(document.createTextNode(dados.result.n_de_faltas));
        alunoDiv.appendChild(alunoIdDiv);
        alunoDiv.appendChild(alunoNomeDiv);
        alunoDiv.appendChild(alunoFaltasDiv);
        document.getElementById('relatorio').appendChild(alunoDiv);

        var barraDeSeparacao = document.createElement("div");
        barraDeSeparacao.classList.add("barraDeSeparacao");
        document.getElementById('relatorio').appendChild(barraDeSeparacao);
    })
}

function colocarFonteDislexia(){
    document.getElementById('botao_carrega_alunos_pag_inicial').style.fontFamily = "OpenDyslexic3";
    document.getElementById('aluno_buscado').style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontSize = "18px";
    document.getElementsByClassName('botao_gerar_relatorio')[1].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontSize = "18px";
    document.getElementsByClassName('botao_gerar_relatorio')[2].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontSize = "18px";
    document.getElementById('titulo_header').style.fontFamily = "OpenDyslexic3";
    document.getElementById('titulo_header_relatorio').style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('botao_aplica_faltas')[0].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('botao_aplica_faltas')[1].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('titulo_coluna_alunos')[0].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('titulo_coluna_alunos')[1].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('titulo_coluna_alunos')[2].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('texto_botao_menu')[0].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('texto_botao_menu')[0].style.fontSize= "18px";
    document.getElementsByClassName('texto_botao_menu')[1].style.fontFamily = "OpenDyslexic3";
    document.getElementsByClassName('texto_botao_menu')[1].style.fontSize= "18px";
    lista_asides = document.getElementsByTagName("aside");
    lista_articles = document.getElementsByTagName("article");
    lista_selects = document.getElementsByTagName("select");

    for (let i = 0; i < lista_asides.length; i++){
        lista_asides[i].style.fontFamily = "OpenDyslexic3";
    }
    for (let i = 0; i < lista_articles.length; i++){
        lista_articles[i].style.fontFamily = "OpenDyslexic3";
    }
    for (let i = 0; i < lista_selects.length; i++){
        lista_selects[i].style.fontFamily = "OpenDyslexic3";
    }

    document.getElementById('botao_fonte_padrao').style.backgroundColor = "white";
    document.getElementById('botao_fonte_dislexia').style.backgroundColor = "darkred";
}

function tirarFonteDislexia(){
    document.getElementById('botao_carrega_alunos_pag_inicial').style.fontFamily = "Kadwa";
    document.getElementById('botao_carrega_alunos_pag_inicial').style.height = "7vh";
    document.getElementById('aluno_buscado').style.fontFamily = "Kadwa";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontFamily = "Kadwa";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontSize = "20px";
    document.getElementsByClassName('botao_gerar_relatorio')[1].style.fontFamily = "Kadwa";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontSize = "20px";
    document.getElementsByClassName('botao_gerar_relatorio')[2].style.fontFamily = "Kadwa";
    document.getElementsByClassName('botao_gerar_relatorio')[0].style.fontSize = "20px";
    document.getElementById('titulo_header').style.fontFamily = "Inknut Antiqua";
    document.getElementById('titulo_header_relatorio').style.fontFamily = "Inknut Antiqua";
    document.getElementsByClassName('botao_aplica_faltas')[0].style.fontFamily = "Kadwa";
    document.getElementsByClassName('botao_aplica_faltas')[1].style.fontFamily = "Kadwa";
    document.getElementsByClassName('titulo_coluna_alunos')[0].style.fontFamily = "Kadwa";
    document.getElementsByClassName('titulo_coluna_alunos')[1].style.fontFamily = "Kadwa";
    document.getElementsByClassName('titulo_coluna_alunos')[2].style.fontFamily = "Kadwa";
    document.getElementsByClassName('texto_botao_menu')[0].style.fontFamily = "Kadwa";
    document.getElementsByClassName('texto_botao_menu')[0].style.fontSize= "20px";
    document.getElementsByClassName('texto_botao_menu')[1].style.fontFamily = "Kadwa";
    document.getElementsByClassName('texto_botao_menu')[1].style.fontSize= "20px";
    lista_asides = document.getElementsByTagName("aside");
    lista_articles = document.getElementsByTagName("article");
    lista_selects = document.getElementsByTagName("select");

    for (let i = 0; i < lista_asides.length; i++){
        lista_asides[i].style.fontFamily = "Kadwa";
    }
    for (let i = 0; i < lista_articles.length; i++){
        lista_articles[i].style.fontFamily = "Kadwa";
    }
    for (let i = 0; i < lista_selects.length; i++){
        lista_selects[i].style.fontFamily = "Kadwa";
    }

    document.getElementById('botao_fonte_padrao').style.backgroundColor = "darkred";
    document.getElementById('botao_fonte_dislexia').style.backgroundColor = "white";
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function geraTxt(aluno){
    download("reprovacao.txt", aluno + " ultrapassou o limite de faltas e foi reprovado.");

    console.log("txt gerado com sucesso");
}

function reprovaAlunos(){
    let body_request = {
        nome_aluno: "nome_decoy",
        n_de_faltas: 0
    }

    fetch('http://localhost:3000/api/aluno/reprova', {method: "PUT", body: JSON.stringify(body_request)});

        fetch('http://localhost:3000/api/buscareprovados')
	    .then(function (resposta) {
            console.log(resposta);
            return resposta.json();
	    })
	    .then(function (dados) {
            console.log(dados);
            console.log(dados.result.length)

            dados.result.forEach(function(aluno){
                geraTxt(aluno.nome_aluno);
            })
        })
}