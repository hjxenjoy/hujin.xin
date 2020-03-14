import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next Personal Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ textAlign: 'center' }}>
        <h1>Try Nextjs</h1>

        <p>
          <Link href="/next">
            <a href="/next">Nextjs</a>
          </Link>
        </p>
      </main>

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
      `}</style>
    </div>
  )
}
