const TableOfContent = ({ guides }) => {
    return (
        <nav>
            <ul>
                {guides.flatMap(guide =>
                    (guide.sections ?? []).flatMap(section =>
                        (section.steps ?? []).map(step => (
                            <li key={`${section._id}-${step.order}`}>
                                <a href={`#${section._id}-${step.order}`}>
                                    {section.title}
                                </a>
                            </li>
                        ))
                    )
                )}
            </ul>
        </nav>
    );
};

export default TableOfContent;