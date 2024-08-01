
import { useEffect, useState } from "react"
import Link from "next/link"
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

import { projects } from "../../data/projects.json"
import userInfo from "../../data/usersInfo.json"

function Projects() {

    const [repo, setRepo] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function fetchRepos() {
        let res;
        let url = `https://api.github.com/users/${userInfo.github_username}/repos`
        if (localStorage.getItem("user_repos") === null) {
            try {
                setLoading(true)
                res = await fetch(url)
                let data = await res.json()
                setLoading(false)
                if (data && data.length > 0) {
                    localStorage.setItem("user_repo", JSON.stringify(data))
                    setRepo(data)
                    return
                }
                setLoading(false)
                setError(`No github repos found.`)
            }
            catch (err) {
                console.error(`FAILED: ${err.message}`)
                setLoading(false)
                setError(`Failed fetching repo: ${err.message}`)
            }
        }

        let userReopos = JSON.parse(localStorage.getItem("user_repos"))

        setRepo(userReopos)
    }

    useEffect(() => {

        (async () => {
            await fetchRepos()
        })()

    }, [])

    return (
        <div className={`projectCont w-full h-auto relative top-[50px] p-10px flex flex-col items-center justify-center mb-[50px]`}>
            <div className={`w-full flex flex-row items-center justify-center`}>
                <span data-aos="zoom-in" className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}></span>
                <p data-aos="fade-up" className={`text-white-200 text-[15px]`}>Latest Works</p>
                <span data-aos="zoom-in" className={`w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]`}></span>


                <Link href="/projects">
                    <a data-aos="zoom-in-up" className={`text-center text-green-200 underline absolute top-[50px] text-[14px]`}>All Projects</a>
                </Link>
            </div>

            <div style={{marginTop:"100px"}} className="projects w-full h-auto p-3 flex flex-wrap justify-between mb-[50px]">
    {projects.length > 0
        ? projects.slice(0, 6).map((list, i) => (
              <div
                  data-aos="zoom-in"
                  key={i}
                  className="box w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.33%-0.75rem)] lg:w-[calc(25%-0.75rem)] h-auto bg-dark-200 rounded-[5px] transition-all mb-[30px] opacity-[.7] hover:opacity-[1]"
              >
                  <div className="imgCont"></div>
                  <style jsx>{`
                      .imgCont {
                          width: 100%;
                          height: 190px;
                          background-image: url(${list.imageUrl === "" || list.imageUrl === null ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg" : list.imageUrl});
                          background-size: cover;
                          background-repeat: no-repeat;
                          background-position: center;
                          border-radius: 5px;
                      }
                  `}</style>
                  <div className="w-full p-[10px]">
                      <div className="w-full h-auto">
                          <p className="text-[15px] text-white-200">
                              {list.title === "" ? "Project Title" : list.title}
                          </p>
                          <br />
                          <small>
                              {list.description === "" ? "some dummy description" : list.description}
                          </small>
                      </div>
                      <br />
                      <div className="flex items-start justify-start">
                          {list.tags.length > 0
                              ? list.tags.slice(0, 3).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] py-[3px] px-[9px] bg-dark-100 mr-[2px] rounded-[2px] text-white-100"
                                    >
                                        {tag}
                                    </span>
                                ))
                              : ""}
                      </div>
                      <span className="absolute right-[10px] text-[12px] flex items-center">
                          {list.project_url !== "" ? (
                              <>
                                  <a
                                      href={list.project_url}
                                      className="text-white-200 mr-[10px] hover:underline hover:text-white-100"
                                  >
                                      View
                                  </a>
                                  <ion-icon name="arrow-forward-outline" className="ml-[10px] p-[10px]"></ion-icon>
                              </>
                          ) : (
                              ""
                          )}
                      </span>
                  </div>
              </div>
          ))
        : ""}
</div>

            <div className="w-full h-auto mt-4 mb-5 p-3 flex flex-row flex-wrap items-center justify-between ">
                {loading ? "Loading..." : error !== null ? <p>{error}</p> : <GithubRepo repos={repo} />}
            </div>
        </div>
    )
}

export default Projects

function GithubRepo({ repos }) {

    return (
        <>
            {
                repos.length > 0 ?
                    repos.slice(0, 3).map((rep, i) => {
                        return (
                            <div data-aos="zoom-in" key={i} className="relative w-full h-[180px] bg-dark-200 flex flex-col items-start justify-start px-4 py-3 mt-2 rounded-md md:w-[300px] ">
                                <h2 className="w-full text-[20px] ">{rep.name}</h2>
                                <br />
                                <p className=" w-full text-[15px] text-white-300 ">{rep.description && rep.description.length > 50 ? rep.description.slice(0, 60) + "...." : rep.description}</p>
                                <br />
                                <div className="ratings absolute bottom-4 w-full flex flex-row items-start justify-start">
                                    <span className="mr-2 flex flex-row items-start justify-start">
                                        <StarRatings title="star" count={rep.stargazers_count} />
                                    </span>
                                    <span className="mr-2 flex flex-row items-start justify-start">
                                        <StarRatings title="fork" count={rep.forks} />
                                    </span>
                                </div>

                                <a href={rep.html_url} target={"_blank"} className="absolute right-3 top-2 flex flex-row items-center">
                                    <small className="underline">View</small>
                                    <FaArrowRight className="ml-2 text-[12px] " />
                                </a>
                            </div>
                        )
                    })
                    :
                    "Opps, No Github Repo was found."
            }
        </>
    )
}

function StarRatings({ count = 1, size = 3, title = "star" }) {

    return (
        <>
            {
                title === "star" ?

                    Array(1).fill(1).map((i) => {
                        return (
                            <FaStar key={i * Math.floor(Math.random() * 1000)} className={`text-green-200 text-[${size}px] `} />
                        )
                    })
                    :
                    <AiFillGithub className={`text-green-200 text-[${size}px] `} />
            }
            <small className="ml-2 text-white-200 font-extrabold">{count}</small>
            <small className="ml-2 text-white-200">{title}</small>
        </>
    )
}
