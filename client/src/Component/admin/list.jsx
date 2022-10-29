const List = ({ users, showDetails, handleDelete }) => {
    const load = (e) => {
        e.target.setAttribute("class", "fas fa-circle-notch fa-spin")
        setTimeout(() => {
            e.target.setAttribute("class", "far fa-envelope")
        }, 2000);
    }
    console.log("test", users);
    return (
        <div className="list">
            {users.map((user, key) =>
                <div key={key} style={user.role === 'super-admin' ? { background: 'var(--yellow-70)' } : {}} className="item">
                    <div className="content" onClick={() => showDetails(user._id)}>
                        <div className="image">
                            <img
                                src={`${process.env.PUBLIC_URL}images/profil1.jpg`}
                                alt="profil"
                            />
                        </div>
                        <div className="text">
                            <p>
                                {user.firstname + ' ' + user.lastname}
                            </p>
                            <span>{user.role}</span>
                        </div>
                    </div>
                    <div className="btnAction">
                        <a
                            onClick={(e) => load(e)}
                            href={`mailto:${user.user_email}`}
                        >
                            <i
                                className="far fa-envelope"
                                title={"contatez " + user.firstname}
                            ></i>
                        </a>
                        <i
                            onClick={handleDelete}
                            data-id={user._id}
                            data-name={user.firstname}
                            className="fas fa-trash idelete"
                            title={"supprimer " + user.firstname}
                        ></i>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;