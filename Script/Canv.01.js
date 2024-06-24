
  window.addEventListener ("load", Begin);

  function Begin ()
      {
         var body, canvas;
         body = document.body;
         if (body == undefined || body == null)
             {  return;  }

         canvas = document.createElement ("CANVAS");
         body.appendChild (canvas);
         ResizeCanvas (canvas);
         AnimateRectangle (.1);

         window.addEventListener ("resize", ResizeCanvas);

         function DrawRectangle (margin)
             {
                var brush = canvas.getContext ("2d");
                if (canvas.height == 0 || canvas.width == 0)
                    {  return;  }

                brush.beginPath ();
                brush.moveTo (canvas.width * margin, canvas.height * margin);
                brush.lineTo (canvas.width * (1 - margin), canvas.height * margin);
                brush.lineTo (canvas.width * (1 - margin), canvas.height * (1 - margin));
                brush.lineTo (canvas.width * margin, canvas.height * (1 - margin));
                brush.closePath ();
                brush.stroke ();
              }

         function AnimateRectangle (margin)
             {
                var brush, current, start, points, increase, main, animated;
                brush = canvas.getContext ("2d");
                if (canvas.height == 0 || canvas.width == 0)
                    {  return;  }

                points = 0;
                start = { };
                increase = { x: 50, y: 0 };
                start.x = canvas.width * margin;
                start.y = canvas.height * margin;
                current = { x: start.x, y: start.y };
                brush.strokeStyle = "#000";
                brush.lineWidth = 1;

                main = window.requestAnimationFrame (Animate);

                function Animate ()
                    {
                       brush.clearRect (0, 0, canvas.width, canvas.height);

                       brush.beginPath ();
                       brush.moveTo (start.x, start.y);
                       if (points > 0)
                           {  brush.lineTo (canvas.width * (1 - margin), start.y);  }
                       if (points > 1)
                           {  brush.lineTo (canvas.width * (1 - margin), canvas.height * (1 - margin));  }
                       if (points > 2)
                           {  brush.lineTo (start.x, canvas.height * (1 - margin));  }
                       brush.lineTo (current.x, current.y);
                       brush.stroke ();

                       if (current.x == start.x && current.y == start.y && points == 3)
                           {
                              brush.closePath ();
                              brush.stroke ();
                              window.cancelAnimationFrame (animated);
                              window.cancelAnimationFrame (main);
                              AnimateCircle (.7);
                              return;
                            }

                       current.x += margin * increase.x;
                       current.y += margin * increase.y;

                       if (current.x >= canvas.width * (1 - margin) && current.y == start.y && points < 1)
                           {
                              current.x = canvas.width * (1 - margin);
                              current.y = start.y;
                              increase = { x: 0, y: 50 };
                              points ++;
                            }
                       else if (current.x >= canvas.width * (1 - margin) && current.y >= canvas.height * (1 - margin) && points < 2)
                           {
                              current.x = canvas.width * (1 - margin);
                              current.y = canvas.height * (1 - margin);
                              increase = { x: -50, y: 0 };
                              points ++;
                            }
                       else if (current.x <= start.x && current.y == canvas.height * (1 - margin) && points < 3)
                           {
                              current.x = start.x;
                              increase = { x: 0, y: -50 };
                              points ++;
                            }
                       else if (current.x == start.x && current.y <= start.y && increase.y < 0 && points < 4)
                           {
                              current.y = start.y;
                              increase.y = 0;
                            }
                       animated = window.requestAnimationFrame (Animate);
                     }
              }

         function AnimateCircle (width)
             {
                var brush, main, circle, animated;
                brush = canvas.getContext ("2d");
                if (brush == undefined || brush == null)
                    {  return;  }

                circle = { };
                circle.angle = 0;
                circle.x = canvas.width / 2;
                circle.y = canvas.height / 2;
                circle.radius = Math.min (canvas.width, canvas.height) * width / 2;

                main = window.requestAnimationFrame (Animate);

                function Animate ()
                    {
                       brush.save ();
                       brush.strokeStyle = "transparent";
                       brush.arc (circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
                       brush.clip ();

                       brush.clearRect (0, 0, canvas.width, canvas.height);
                       brush.strokeStyle = "#000";
                       brush.lineWidth = 3;
                       brush.beginPath ();
                       brush.arc (circle.x, circle.y, circle.radius, 0, circle.angle);
                       brush.stroke ();

                       if (circle.angle >= 2 * Math.PI)
                           {
                              brush.restore ();
                              window.cancelAnimationFrame (animated);
                              window.cancelAnimationFrame (main);
                              return;
                            }

                       circle.angle += (2 / 250) * Math.PI;
                       if (circle.angle > 2 * Math.PI)
                           {  circle.angle = 2 * Math.PI;  }
                       animated = window.requestAnimationFrame (Animate);
                       brush.restore ();
                     }
              }

         function ResizeCanvas (resize)
             {
                if (resize == undefined || resize == null)
                    {  return;  }

                var canvas, root;
                canvas = resize;
                root = document.documentElement;
                if (canvas.tagName == undefined)
                    {
                       if (resize.target == undefined || resize.target == null)
                           {  return;  }
                       canvas = resize.target;
                     }

                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
              }
       }