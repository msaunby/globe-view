globe-view
==========

View images wrapped on a sphere

Take a look at the website http://msaunby.github.io/globe-view/

Browser compatibilty
--------------------
HTML5 video in Firefox may not support mp4 video on some systems. The webm format is supported so convert clips using ffmpeg.  e.g.
ffmpeg -i input.mp4 -codec:v libvpx -quality good -cpu-used 0 -b:v 500k -qmin 10 -qmax 42  output.webm

A free online webm conversion service is available at http://video.online-convert.com/convert-to-webm
