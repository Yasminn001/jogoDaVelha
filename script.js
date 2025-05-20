 //inicializa as casas com nove para sabermos que não foi clicado
 var casas = [9, 9, 9, 9, 9, 9, 9, 9, 9];
 //indica a vez do jogador - (1) xis (-1) bola
 var vez = 1;
 //conta quantos cliques foram dados durante o jogo
 var contaclique = 0;
 //Placar
 var iPontosX = 0;
 var iPontosO = 0;
 var iPontosV = 0;
 var sResposta = "";
 
 //funcao que verifica as jogadas
 function verifica(casa) {
     //verifica se a casa não foi clicada
     if(casas[casa] == 9) {
         //Modifica de 9 para o valor do jogador da vez
         casas[casa] = vez;
         
         //se o jogador da vez for 1, coloca o desenho do xis
         if(vez == 1) {
             document.getElementById("img"+casa).src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cline x1='10' y1='10' x2='90' y2='90' stroke='%23e50914' stroke-width='10'/%3E%3Cline x1='90' y1='10' x2='10' y2='90' stroke='%23e50914' stroke-width='10'/%3E%3C/svg%3E";
         } else {
             //se o jogador for -1, coloca o desenho da bola
             document.getElementById("img"+casa).src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%234dabf7' stroke-width='10' fill='none'/%3E%3C/svg%3E";
         }
         
         //inverte o jogador da vez
         vez *= -1;
         contaclique++;
         
         //confere se houve vencedor
         confere();
     }
 }
 
 //Função que testa se houve vencedor
 function confere() {
     var i;
     //Variável que marca se houve ganhador
     var lGanhou = false;
     //Variável que marca se o jogo acabou (todas casas clicadas)
     var lAcabou = false;
     
     //percorre todas as casas para verificar se ainda existe alguma não clicada
     for(i = 0; i < casas.length; i++) {
         if(casas[i] == 9) {
             //se houver sabemos que ainda não deu velha
             lAcabou = false;
             break;
         } else {
             lAcabou = true;
         }
     }
     
     //se a quantidade de cliques forem 9, o jogo acabou
     if(contaclique == 9) {
         lAcabou = true;
     }
     
     //Realiza a soma de cada coluna, linha e diagonal e coloca o valor num vetor
     var Soma = [];
     Soma[0] = casas[0] + casas[1] + casas[2]; //linha 1
     Soma[1] = casas[3] + casas[4] + casas[5]; //linha 2
     Soma[2] = casas[6] + casas[7] + casas[8]; //linha 3
     Soma[3] = casas[0] + casas[3] + casas[6]; //coluna 1
     Soma[4] = casas[1] + casas[4] + casas[7]; //coluna 2
     Soma[5] = casas[2] + casas[5] + casas[8]; //coluna 3
     Soma[6] = casas[0] + casas[4] + casas[8]; //diagonal 1
     Soma[7] = casas[2] + casas[4] + casas[6]; //diagonal 2
     
     //percorre todos os valores de soma
     for(i = 0; i < Soma.length; i++) {
         //se achou uma soma (-3) é porque a bola ganhou
         if(Soma[i] == -3) {
             lGanhou = true;
             sResposta = " bolinha ganhou GANHOU!!";
             iPontosO++;
             document.getElementById("bola").innerHTML = iPontosO;
             break;
         } else if(Soma[i] == 3) {
             //se achou uma soma (3) é porque a xis ganhou
             lGanhou = true;
             sResposta = " Xis GANHOU!!";
             iPontosX++;
             document.getElementById("xis").innerHTML = iPontosX;
             break;
         }
     }
     
     
     if(lGanhou == false && lAcabou == true) {
         sResposta = "Deu velha!";
         iPontosV++;
         document.getElementById("velha").innerHTML = iPontosV;
     }
     
    
     if(lGanhou || lAcabou) {
        
         for(i = 0; i < casas.length; i++) {
             document.getElementById("casa"+i).style.pointerEvents = "none";
             casas[i] = 0;
         }
     }
     
   
     document.getElementById("resposta").innerHTML = "RESULTADO:  " + sResposta;
 }
 

 function recomeca() {
     for(i = 0; i < casas.length; i++) {
        
         document.getElementById("img"+i).ondragstart = function() { return false; };
        
         document.getElementById("casa"+i).style.pointerEvents = "auto";
         //remove as imagens
         document.getElementById("img"+i).src = "img/logo.png";
         //volta configuração original
         document.getElementById("resposta").innerHTML = "RESULTADO";
         //restaura os 9 das casas
         casas[i] = 9;
     }
     
     lGanhou = false;
     lAcabou = false;
     contaclique = 0;
     vez = 1;
 }