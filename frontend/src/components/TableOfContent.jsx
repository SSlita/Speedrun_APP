const TableOfContent = ({ guides }) => {
    return (
        <nav>
            <ul>
                {guides.flatMap(guide =>
                    (guide.sections ?? []).flatMap(section =>
                        <li key={`${section._id}-${section.title}`}>
                            <a href={`#${section._id}`}>
                                {section.title}
                            </a>
                        </li>
                    ))
                }

            </ul>
        </nav>
    );
};

export default TableOfContent;