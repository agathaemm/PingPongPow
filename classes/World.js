
// Construtor do mundo
function World( w, h ) {

    // pega por referencia
    var _this = this;

    // largura do mundo
    this.width = w;

    // altura do mundo
    this.height = h;

    // corpos adicionados ao mundo
    this.bodies = new Array();

    // taxa de frames por segundo
    this.frameRate = 24;

    // o clock
    this.clock = null;

    // o canvas
    this.canvas = document.createElement( 'canvas' );

    // o contexto
    this.ctx = _this.canvas.getContext( '2d' );

    // cor do canvas
    this.color = 'black';

    // indica se o mundo esta rodando
    this.running = false;

    // método construtor
    function construct() {

        // define a largura e a altura do canvas
        _this.canvas.width  = _this.width;
        _this.canvas.height = _this.height;

        // preenche o background do canvas
        _this.canvas.style.backgroundColor = _this.color;

        // adiciona o canvas ao DOM
        document.getElementById('wrapper').appendChild( _this.canvas );
    }
    construct();

    // adiciona um novo corpo ao mundo
    this.add = function( body ) {

        // adiciona no array bodies
        _this.bodies.push( body );
    }

    // inicia o mundo
    this.start = function() {

        // cria o clock
        _this.clock = setInterval( function(){
            _this.update();
        }, 1000 / this.frameRate );

        // muda o status do mundo
        _this.running = true;
    }

    // para o clock
    this.stop = function() {

        // para o clock
        clearInterval( _this.clock );

        // muda o status do mundo
        _this.running = false;
    }

    // limpa o canvas
    this.clear = function() {
        _this.ctx.clearRect( 0, 0, _this.width, _this.height );
    }

    // destroy o mundo
    this.destroy = function() {
        _this.canvas.parentElement.removeChild( _this.canvas );
    }

    // chamada sempre que o mundo atualiza
    this.update = function() {
        
        // limpa o canvas
        _this.clear();

        // percorre todos os corpos adicionados ao mundo
        for ( var b in _this.bodies ) {

            // verifica se o corpo tem uma funcao update
            if ( typeof _this.bodies[b]['update'] !== undefined ) {

                // chama a funcao update do corpo
                _this.bodies[b]['update']( _this );
            }
        }
    }

    // destroi o jogo atual
    this.destroy = function() {
        _this.canvas.parentNode.removeChild( _this.canvas );
        delete this;
    }
}
