---
layout: page
title: Admin console
permalink: /admin/
---

<iframe src="/console/admin/" width="100%" height="480"></iframe>

Control multicast snooping inside the bridge
--------------------------------------------

    $ echo 0 | sudo tee /sys/devices/virtual/net/lxdbr0/bridge/multicast_snooping
    $ echo 1 | sudo tee /sys/devices/virtual/net/lxdbr0/bridge/multicast_snooping
