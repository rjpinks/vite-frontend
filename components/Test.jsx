import PostCreater from "./PostCreater";

export default function Test(props) {
    const currentPage = props.currentPage;
    return (
        <PostCreater currentPage={currentPage} />
    )
}