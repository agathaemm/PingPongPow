function Game() {

    // pega o this por referencia
    var _this = this;

    // o mundo do novo jogo
    this.world;

    // inicia um novo jogo
    this.NewGame = function() {

        // cria o mundo
        _this.world = new World( 400, 600 );

        // instancia os componentes do jogo
        var q  = new Square( 10, 10, function( q ) {

            // finaliza o jogo
            _this.Pause();

            // verifica a direção do quadrado
            if ( q.verticalDirection != -1 ) {
                _this.GameStatus( 'Jogador 1 ganhou' );
            } else {
                _this.GameStatus( 'Jogador 2 ganhou' );
            }

        });
        q.middle( _this.world );
        var r1 = new Rect( 37, 39, 0, q );
        var r2 = new Rect( 65, 68, 590, q );

        // adiciona os corpos no mundo
        _this.world.add( q );
        _this.world.add( r2 );
        _this.world.add( r1 );
    }
    this.NewGame();

    // inicia o jogo
    this.Start = function() {
        _this.world.stop();
        _this.world.destroy();
        delete _this.world;
        _this.NewGame();
        _this.world.start();
        _this.GameStatus( 'Jogando ...' );
    }

    // pausa o jogo
    this.Pause = function() {

        // muda o status do mundo
        if ( _this.world.running ) {
            _this.GameStatus( 'Jogo pausado' );
            _this.world.stop(); 
        } else {
            _this.GameStatus( 'Jogando ...' );
            _this.world.start();
        }
    }

    // seta o status do jogo
    this.GameStatus = function( status ) {
        document.getElementById('GameStatus').innerHTML = status;
    }
}