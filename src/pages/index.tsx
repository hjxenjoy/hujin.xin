import Link from 'next/link'
import Head from 'next/head'

interface Props {
  isMobile?: boolean
  isPad?: boolean
  webp?: boolean
}

const background =
  'https://images.unsplash.com/photo-1503079789711-148472409b63?ixlib=rb-1.2.1&fit=crop&q=80'

function Home({ webp, isMobile, isPad }: Props) {
  let url = background
  if (webp) {
    url += '&fm=webp'
  } else {
    url += '&auto=format'
  }
  if (isPad) {
    url += '&w=1024'
  } else if (isMobile) {
    url += '&w=750'
  } else {
    url += '&w=1440'
  }

  return (
    <>
      <Head>
        <title>胡金鑫的个人网站</title>
      </Head>
      <header className="header">
        <Link as="/" href="/">
          <a href="/" className="home-link">
            HUJIN.XIN
          </a>
        </Link>
        <a
          href="https://github.com/hjxenjoy"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </header>
      <main className={`main${isMobile ? ' mobile-main' : ''}`}>
        <h1 className="author-name">胡金鑫</h1>
        <p className="slogan">To Be A Better Man</p>
      </main>
      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 50px);
          align-items: center;
          justify-content: center;
          padding-bottom: 15%;
        }
        .mobile-main {
          padding-bottom: 20%;
        }
        .author-name {
          margin: 0 0 20px;
          font-weight: 400;
          letter-spacing: 2px;
          color: #bec6cd;
          font-size: 36px;
          text-shadow: 1px 1px 2px rgba(31, 41, 39, 0.5);
        }
        .github-link {
          color: #3a5756;
        }
        .github-link svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }
        .slogan {
          margin: 0;
          color: #a6b4b6;
          font-size: 18px;
          border-bottom: 1px dotted currentColor;
          letter-spacing: 1px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px;
          height: 50px;
        }
        .home-link {
          color: #1f3330;
          text-shadow: 2px 2px 0 #bfbec1;
          text-decoration: none;
          font-size: 20px;
          font-family: 'Baloo Bhaina 2', cursive;
          line-height: 24px;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        body {
          height: 100vh;
          background: url('${url}') no-repeat center / cover;
        }
      `}</style>
    </>
  )
}

Home.getInitialProps = async ctx => {
  if (ctx.req) {
    const { headers } = ctx.req
    const ua = headers['user-agent']
    const webpSupport = /image\/webp/i.test(headers.accept)
    return {
      isMobile: /mobile/i.test(ua),
      isPad: /pad/i.test(ua),
      webp: webpSupport,
    }
  }
  return {}
}

export default Home
