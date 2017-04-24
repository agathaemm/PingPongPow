function Rect( xKey, yKey, yPositon, q ) {
    
    // pega por referencia
    var _this = this;

    // quadrado
    this.square = q;

    // largura
    this.width = 100;

    // altura
    this.height = 10;

    // cor
    this.color = 'white';

    // tecla esquerda
    this.xKey = xKey;

    // tecla direita
    this.yKey = yKey;

    // posicao y
    this.yPosition = yPositon;

    // posicao x
    this.xPosition = 150;

    // velocidade
    this.speed = 10;

    // indica se a tecla X esta sendo pressionada
    this.isXKeyPressed = false;

    // indica se a tecla Y esta sendo pressionada
    this.isYKeyPressed = false;

    // chamado quando uma tecla é pressionada
    window.addEventListener('keydown', function( e ) {
        
        // verifica se a tecla para a esquerda foi pressionada
        if( e.keyCode == _this.xKey ) {
            _this.isXKeyPressed = true; 
            _this.isYKeyPressed = false;
        }  
        
        // verifica se a tecla pra direita foi pressionada
        if( e.keyCode == _this.yKey ) {
            _this.isYKeyPressed = true;
            _this.isXKeyPressed = false;
        }   
    });

    // chamado quando a tecla é solta
    window.addEventListener('keyup', function( e ) {

        // verifica se a tecla para a esquerda foi solta
        if( e.keyCode == _this.xKey ) _this.isXKeyPressed = false;

        // verifica se a tecla para a direita foi solta  
        if( e.keyCode == _this.yKey ) _this.isYKeyPressed = false;     
    });

    // verifica se o quadradinho bateu no retangulo
    this.hit = function() {
        
        // verifica se o quadradinho bateu verticalmente
        if( _this.square.yPosition > _this.yPosition && _this.square.yPosition < ( _this.yPosition + _this.height ) ) {
            if( _this.square.xPosition > _this.xPosition && _this.square.xPosition < ( _this.xPosition + _this.width ) ) {
                console.log( 'Hit' );
                return true;
            }
        }

        // verifica se o quadradinho bateu verticalmente
        var pos = _this.square.yPosition + _this.square.height;
        if( pos > _this.yPosition && pos < ( _this.yPosition + _this.height ) ) {
            if( _this.square.xPosition > _this.xPosition && _this.square.xPosition < ( _this.xPosition + _this.width ) ) {
                console.log( 'Hit' );
                return true;
            }
        }

        // retorna falso por padrao
        return false;
    }

    // move para a direita
    this.moveRight = function( world ) {

        // verifica se o retangulo nao bateu na lateral direita
        if ( ( _this.xPosition + _this.width ) <= world.width ) {

            // move o retangulo para a direita
            _this.xPosition = _this.xPosition + _this.speed;
        }
    }

    // move para a esquerda
    this.moveLeft = function() {
        
        // verifica se o retangulo nao bateu na lateral esquerda
        if ( _this.xPosition > 0 ) {

            // move o retangulo para a esquerda
            _this.xPosition = _this.xPosition - _this.speed;
        }
    }

    // desenha o retangulo na tela
    this.draw = function( world ) {

        // desenha o quadrado
        world.ctx.fillStyle = _this.color;
        world.ctx.fillRect( _this.xPosition, _this.yPosition, _this.width, _this.height );
    }
    
    // recarrega a tela
    this.update = function( world ) {
        
        // verifica qual tecla foi pressionada e move o retangulo
        if( _this.isXKeyPressed ) _this.moveLeft( world );
        if( _this.isYKeyPressed ) _this.moveRight( world );

        // verifica se bateu e muda a direcao
        if( _this.hit() ) _this.square.changeVerticalDirection();

        // desenha o retangulo
        _this.draw( world );
    } 
}