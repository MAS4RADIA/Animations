window.addEventListener ("load", StartBalling);

function StartBalling ()
    {
       var brush, canvas, body;
       body = document.body;
       canvas = document.querySelector ("CANVAS");
       if (canvas == null)
            {
               canvas = document.createElement ("CANVAS");
               body.appendChild (canvas);
             }
       class Ball
           {
              sign = { x: 1, y: 1 };
              position = { x: 0, y: 0 };
              step = { x: Math.random (), y: Math.random () };
              radius = { current: 0, full: Math.random () * 25, step: Math.random () };
              color = this.scheme ();
              last = { x: 0, y: 0 };
              child = null;

              constructor (canvas, ratio)
                  {
                     if (canvas == undefined || canvas == null)
                         {  return;  }
                     if (isNaN (canvas))
                         {
                            if (canvas.tagName == undefined)
                                {  return;  }
                            this.position.x = canvas.width / 2;
                            this.position.y = canvas.height / 2;
                            this.step.x *= canvas.width / 200;
                            this.step.y *= canvas.height / 200;
                            this.last.x = this.position.x;
                            this.last.y = this.position.y;
                          }
                     else
                         {  ratio = canvas;  }

                     if (isNaN (ratio) || ratio <= 0)
                         {  return;  }
                     this.radius.full = Math.min (canvas.width, canvas.height) / 2;
                     if (ratio < 1)
                         {  this.radius.full *= ratio;  }
                   }
              clone ()
                  {
                     var double = new Ball ();
                     double.sign = { x: this.sign.x, y: this.sign.y };
                     double.step = { x: Math.random () * double.sign.x, y: Math.random () * double.sign.y };
                     double.radius = { current: 0, full: Math.random () * 25, step: Math.random () };
                     double.position = { x: this.position.x, y: this.position.y };
                     double.last = { x: double.position.x, y: double.position.y };
                     double.color = this.scheme ();
                     double.child = null;
                     return (double);
                   }
              bump (axis)
                  {
                     var direct = { x: 0, y: 0 };
                     switch (axis.toLowerCase ())
                         {
                            case "x":
                                this.sign.x *= -1;
                                this.step.x *= this.sign.x;
                              break;
                            case "y":
                                this.sign.y *= -1;
                                this.step.y *= this.sign.y;
                              break;
                          }
                     direct.x = axis == "x" && Math.abs (this.last.x - this.position.x) < this.radius.current;
                     direct.y = axis == "y" && Math.abs (this.last.y - this.position.y) < this.radius.current;
                     if (direct.x || direct.y)
                         {
                          }
                     else
                         {
                            this.child = this.clone ();
                          }

                     this.last.x = this.position.x;
                     this.last.y = this.position.y;
                   }
              draw ()
                  {
                     if (brush == undefined || brush == null || brush.canvas == undefined)
                         {  return;  }

                     brush.beginPath ();
                     brush.fillStyle = this.color;
                     brush.arc (this.position.x, this.position.y, this.radius.current, 0, 2 * Math.PI);
                     brush.fill ();
                     this.move ();
                   }
              SetColor ()
                  {  this.color = scheme ();  }
              scheme ()
                  {
                     var primitive, color, pick;
                     color = "#";
                     primitive = "7ABCDEF123467890";

                     pick = 0;
                     while (pick < 6)
                         {
                            var index = Math.random ();
                            index = Math.floor (index * primitive.length);
                            if (index == undefined)
                                {  continue;  }

                            color += primitive [index];
                            pick ++;
                          }
                     return (color);
                   }
              grow ()
                  {
                     if (this.radius.current >= this.radius.full)
                         {  return;  }

                     this.radius.current += this.radius.step;
                     if (this.radius.current > this.radius.full)
                         {  this.radius.current = this.radius.full;  }
                   }
              move ()
                  {
                     if (this.position.x <= this.radius.current || this.position.x + this.radius.current >= canvas.width)
                         {  this.bump ("x");  }
                     if (this.position.y <= this.radius.current || this.position.y + this.radius.current >= canvas.height)
                         {  this.bump ("y");  }

                     this.position.x += this.step.x;
                     this.position.y += this.step.y;

                     this.grow ();
                   }
            }

       window.addEventListener ("resize", SetCanvas);
       brush = canvas.getContext ("2d");

       SetCanvas ();
       MoveBall ();

       function SetCanvas ()
           {
              if (canvas == undefined || canvas == null || canvas.tagName == undefined)
                  {  return;  }
              canvas.height = window.innerHeight;
              canvas.width = window.innerWidth;
            }
       function MoveBall ()
           {
              if (canvas == undefined || canvas == null || canvas.tagName == undefined)
                  {  return;  }
              if (brush == undefined || brush == null || brush.canvas == undefined)
                  {  return;  }

              var main, ball;
              ball = [ new Ball (canvas) ];
              main = requestAnimationFrame (Animate);

              function Animate ()
                  {
                     var animated, collection, trail;
                     trail = new Array ();
                     brush.clearRect (0, 0, canvas.width, canvas.height);
                     for (collection in ball)
                          {
                             var bag;
                             bag = ball [collection];
                             bag.draw ();

                             if (bag.child != null)
                                 {
                                    trail.push (bag.child);
                                    bag.child = null;
                                  }
                           }
                     ball = ball.concat (trail);
                     animated = requestAnimationFrame (Animate);
                   }
            }
     }