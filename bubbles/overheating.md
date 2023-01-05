# Overheating

I have overheating problems (computer shuts down with no error message suggests so). Currently my approach to solve this problem was to:

1. Monitor with https://openhardwaremonitor.org/ (note, it saves the logs so the location of the executable, it is also capable of plotting.)
1. Here I verified that my cpu reached 90°C+ temperatures sometimes. Maybe this is expected when the computer was new and the thermal paste functioned at optimum.
1. In any case, I decided after some research to limit the performance of the cores to lower the temperatures. This is done with https://www.techpowerup.com/download/techpowerup-throttlestop/ . Initially I thought of undervolting (less voltage --> less frequency --> less speed --> less disipatted power)
1. Basically I just activated the "Battery" Profile and with that temperature was down to 60°C+.

I hope this solves the random shutdowns that were driving me mad.

Note: Intel XTU no longer works with my 8250u cpu. So thats why I used ThrottleStop (although you could find and older version such as [6.5.1.321](https://community.intel.com/t5/Processors/How-is-8-th-gen-8250u-not-supported-by-newer-versions-of-XTU/td-p/633651)). In any case, ThrottleStop seems to be [more reliable and universal](https://www.techpowerup.com/forums/threads/throttling-on-intel-i5-8250u.266531/)