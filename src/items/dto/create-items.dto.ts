import { CreateCommentsDto } from "./create-comments.dto";
import { CreateListingDto } from "./create-listing.dto";
import { CreateTagDto } from "./create-tags.dto";

export class CreatItemDto {
    name: string;
    public: boolean;
    listing: CreateListingDto;
    comments: CreateCommentsDto[];
    tags: CreateTagDto[];
}