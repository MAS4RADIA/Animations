
  window.addEventListener ("load", Start);

  function Start ()
      {
         var canvas, brush;
         CheckCanvas ();
         if (canvas == undefined || canvas == null || canvas.tagName == undefined)
             {  return;  }

         CheckSize ();
         window.addEventListener ("resize", CheckSize);
      /* ---------------------------------------------- */
         DoubleCircle (.8);
      /* ---------------------------------------------- */
         function CheckCanvas ()
             {
                if (canvas != undefined && canvas != null && canvas.tagName.toLowerCase () == "canvas")
                    {  return;  }

                canvas = document.createElement ("CANVAS");
                document.body.appendChild (canvas);
                brush = canvas.getContext ("2d");
              }
         function CheckSize ()
             {
                var body = document.body;
                if (body == undefined || body == null)
                    {  return;  }

                canvas.width = body.clientWidth;
                canvas.height = body.clientHeight;
              }
      /* -------------------------------------------------- */
         function DoubleCircle (ratio)
             {
                if (brush == undefined || brush == null || brush.canvas == undefined)
                    {  return;  }

                var main, animated, circle;
                circle = { start: Math.PI };
                circle.angle = circle.start;
                circle.slow = circle.angle;
                circle.shrinking = false;

                main = requestAnimationFrame (Move);

                function Move ()
                    {
                       circle.x = canvas.width / 2;
                       circle.y = canvas.height / 2;
                       if (circle.shrinking == false)
                           {  circle.radius = Math.min (circle.x, circle.y) * ratio;  }
                       brush.clearRect (0, 0, canvas.width, canvas.height);
                       brush.lineCap = "round";

                       brush.beginPath ();
                       brush.arc (circle.x, circle.y, circle.radius, circle.start, circle.angle);
                       brush.stroke ();

                       brush.beginPath ();
                       brush.arc (circle.x, circle.y, circle.radius, 2 * circle.start, circle.angle + Math.PI);
                       brush.stroke ();

                       if (!circle.shrinking)
                           {
                              brush.beginPath ();
                              brush.arc (circle.x, circle.y, circle.radius * 1.1, circle.angle, 2 * circle.start);
                              brush.stroke ();

                              brush.beginPath ();
                              brush.arc (circle.x, circle.y, circle.radius * 1.1, circle.angle + Math.PI, circle.start);
                              brush.stroke ();
                            }

                       if (circle.angle >= 2 * Math.PI)
                           {
                              circle.radius -= 6;
                              circle.shrinking = true;
                            }
                       else
                           {
                              circle.angle += Math.PI / 160;
                              circle.slow += Math.PI / 420;
                            }
                       if (circle.radius <= 0)
                           {
                              Multiply ();
                              cancelAnimationFrame (main);
                              if (animated == undefined || animated == null)
                                  {  return;  }

                              cancelAnimationFrame (animated)
                              return;
                            }
                       animated = requestAnimationFrame (Move);
                     }
              }
         function Multiply ()
             {
                if (brush == undefined || brush == null || brush.canvas == undefined)
                    {  return;  }

                var main, animated, ring;
                ring = new Array ();
                ring.push (new Circle);

                ring [0].direction.x = Math.random () * 5;
                ring [0].direction.y = Math.random () * 5;
                ring [0].x = canvas.width / 2;
                ring [0].y = canvas.height / 2;
                ring [0].scheme ();

                requestAnimationFrame (Move);
                function Move ()
                    {
                       var collection, trail;
                       trail = new Array ();
                       brush.clearRect (0, 0, canvas.width, canvas.height);
                       for (collection in ring)
                           {
                              var boom = false;
                              circle = ring [collection];
                              if (circle.angle == undefined)
                                  {  continue;  }

                              brush.beginPath ();
                              brush.fillStyle = circle.color;
                              brush.arc (circle.x, circle.y, circle.radius, circle.start, circle.angle);
                              brush.fill ();

                              if (circle.radius < 20)
                                  {  circle.radius += .6;  }

                              circle.x += circle.direction.x;
                              circle.y += circle.direction.y;

                              if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0)
                                  {
                                     circle.sign.x *= -1;
                                     circle.direction.x *= circle.sign.x;
                                     boom = true;
                                   }
                              if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0)
                                  {
                                     circle.sign.y *= -1;
                                     circle.direction.y *= circle.sign.y;
                                     boom = true;
                                   }

                              if (boom)
                                  {
                                     let kid;
console.log ("Bump!");
                                     circle.radius = 0;
                                     kid = circle.clone ();
                                     circle.scheme ();
                                   }
                            }
                       if (trail.length > 0)
                           {  ring = ring.concat (trail);  }
                       animated = requestAnimationFrame (Move);
                     }
              }
         class Circle
             {
                x = 0;
                y = 0;
                start = 0;
                radius = 0;
                angle = 2 * Math.PI;
                sign = { x: 1, y: 1 };
                direction = { x: 0, y: 0 };
                color = null;

                clone ()
                    {
                       var double = new Circle ();
                       double.x = this.x;
                       double.y = this.y;
                       double.start = this.start;
                       double.radius = this.radius;
                       double.direction = this.direction;
                       double.angle = this.angle;
                     }
                scheme ()
                    {
                       var primitive, index;
                       this.color = "#";
                       primitive = "ABCDEF1234678900";

                       index = 0;
                       while (index < 6)
                           {
                              var pick;
                              pick = Math.floor (Math.random () * primitive.length);
                              this.color += primitive [pick];
                              index ++;
                            }
                     }
              }
       }