import Phaser from 'phaser'
import { sharedInstance as events } from './EventCenter'
import Ganaste from './Ganaste'
import Perdiste from './Perdiste'





export default class Juego extends Phaser.Scene
{
  
    nivel
	init (data){
        console.log(data)
        this.nivel = data.nivel
        
    }


    preload()
    {
    }

    create()
    {
        switch(this.nivel){
            case 1: {
                //logica cantidad cartas y ubicacion
                this.coordenadas.push([240,500]);
                break;
            }                
            case 2: {
                //logica cantidad cartas y ubicacion
                this.coordenadas.push([240,300]);
                break;
            }
            case 3: {
                //logica cantidad cartas y ubicacion
                this.coordenadas.push([240,375]);
                break;
            }
            case 4: {
                //logica cantidad cartas y ubicacion
                this.coordenadas.push([180,300]);
                break;
            }
            case 5: {
                //logica cantidad cartas y ubicacion
                this.coordenadas.push([144,300]);
                break;
            }
        }

        // Fondo del nivel
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bosque', 'lago', 'montaña').setScale(1.1);
    this.add.image(400, 100, 'temporizador');
    this.add.image(120, 100, 'puntos');
    this.puntos = this.add.text(130, 60, '0', { fontFamily: 'Rockwell', fontSize: 70, color: '#000000' })

    //clic
    this.clic = this.sound.add('clic');

    // Boton para volver al menu principal
    const menu = this.add.image(600, 100, "boton_menu").setScale(1.1);
    menu.setInteractive();
    menu.on("pointerdown", () => this.scene.start("MenuPrincipal"));
    this.clic.play();

    // Si no junta todas las cartas en 20 segundos --> Game Over
    this.initialTime = 40
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
    this.timeText = this.add.text(340, 60, '40', { fontFamily: 'Rockwell', fontSize: 70, color: '#000000' });
    
        
    //Para ir a la pantalla de ganaste una vez que se dan vuelta todas las cartas
        if (this.coincidencias === 2) {
           this.ganaste();
          }
    }

    update()
    {
        //si gane ! ver si va a la escena ganaste o queda aca
        events.emit('pasar-nivel')

      if (this.perdiste) {
        return
      }
    }
  
    perdiste() {
      this.scene.start('Perdiste');
    }
  
    ganaste() {
      this.scene.start('Ganaste');
    }
  
    onSecond() {
      if (!this.perdiste) {
        this.initialTime = this.initialTime - 1; // One second
        this.timeText.setText(this.initialTime);
        if (this.initialTime == 0) {
          this.timedEvent.paused = true;
          this.perdiste()
        }
      }
    }

    }

