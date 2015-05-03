# /tasks

Anything run by [gulp] goes in here. [gulp] is similar to [rake] in that it is designed to automate running tasks for your workflow.

To deploy the entire site to S3:

```sh
#!/bin/sh
gulp clean build publish invalidate
```

[gulp]: http://gulpjs.com/
[rake]: http://rake.rubyforge.org/
