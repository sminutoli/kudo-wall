# Virtual Kudo Wall [![Build Status](https://travis-ci.org/10Pines/kudo-wall.svg?branch=master)](https://travis-ci.org/10Pines/kudo-wall)
## For 10Pines slack integration

The kudowall is running at: [kudos.10pines.com](https://kudos.10pines.com/)

# Development
Use `docker-compose up`

# How to post a Kudo

```
curl -X POST \
  http://localhost:3000/nuevo \
  -H 'content-type: application/json' \
  -d '{
	"user_name": "foo",
	"text": "para Bar por Bizz",
	"token": "Tis a token"
}'
```

