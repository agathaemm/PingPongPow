function Square( w, h, gameover ) {

    // pega por referencia
    var _this = this;

    // em caso de gameover
    _this.gameover = gameover;

    // largura
    this.width = w;

    // altura
    this.height = h;

    // posicao x
    this.xPosition = 0;

    // posicao y
    this.yPosition = 0;

    // direção vertical
    this.verticalDirection = -1;

    // direção horizontal
    this.horizontalDirection = -1;

    // velocidade
    this.speed = 13;

    // cor do quadrado
    this.color = 'white';

    // incrementa a velocidade
    this.increaseSpeed = function() {
        _this.speed = _this.speed * 1.2;
    }

    // muda a direção horizontal
    this.changeHorizontalDirection = function() {
        _this.horizontalDirection = _this.horizontalDirection * -1;
    }

    // muda a direção vertival
    this.changeVerticalDirection = function() {
        _this.verticalDirection = _this.verticalDirection * -1;
    }

    // posiciona o quadrado no centro
    this.middle = function( world ) {

        // seta a posicao vertical
        _this.yPosition = ( world.height / 2 ) - ( _this.height / 2 );

        // seta a posicao horizontal
        _this.xPosition = ( world.width / 2 ) - ( _this.width / 2 );
    }

    // verifica se bateu na lateral
    this.hitHorizontal = function( world ) {
        
        // verifca se saiu pela esquerda
        if ( _this.xPosition < 0 ) return true;

        // verifica se saiu pela direita
        if ( ( _this.xPosition + _this.width ) > world.width ) return true;

        // retorna false por padrao
        return false;
    }

    // verifica se bateu na vertical
    this.hitVertical = function( world ) {

        // verifica se bateu em cima
        if ( _this.yPosition < 0 ) return true;

        // verifica se bateu em baixo
        if ( ( _this.yPosition + _this.height ) > world.height ) return true;

        // retorna falso por padrao
        return false;
    } 

    // desenha o quadrado no canvas
    this.draw = function( world ) {

        // desenha o quadrado
        world.ctx.fillStyle = _this.color;
        world.ctx.fillRect( _this.xPosition, _this.yPosition, _this.width, _this.height );
    }

    // movimenta o quadradinho na tela
    this.move = function() {

        // verifica a posicao horizontal
        if ( _this.horizontalDirection == -1 ) {
            _this.xPosition = _this.xPosition - _this.speed;
        } else {
            _this.xPosition = _this.xPosition + _this.speed;
        }

        // verifica a posicao vertical
        if ( _this.verticalDirection == -1 ) {
            _this.yPosition = _this.yPosition - _this.speed;
        } else {
            _this.yPosition = _this.yPosition + _this.speed;
        }
    }

    // função chamada na atualizacao do mundo
    this.update = function( world ) {
        
        // move o quadrado
        _this.move();

        // verifica se bateu horizontalmente
        if ( _this.hitHorizontal( world ) ) _this.changeHorizontalDirection();
        
        // verifica se bateu verticalmente
        if ( _this.hitVertical( world ) ) _this.gameover( _this );

        // desenha o quadrado
        _this.draw( world );
    } 
}